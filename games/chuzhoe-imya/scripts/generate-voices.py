"""Build the game's offline dialogue clips using licensed Piper voice models."""

import argparse
import io
import json
from pathlib import Path
import re
import subprocess
import wave

import imageio_ffmpeg
from piper import PiperVoice, SynthesisConfig

GAME = Path(__file__).resolve().parents[1]
SAMPLE_RATE = 24000
ROLES = {
    "oleg": ("denis", 1.02, 0.93),
    "victor": ("dmitri", .88, .99),
    "maria": ("dmitri", 1.24, 1.02),
    "irina": ("denis", 1.27, .99),
    "danya": ("denis", 1.15, 1.07),
    "mother": ("dmitri", 1.34, 1.04),
    "stas": ("denis", .93, 1.01),
    "archivist": ("dmitri", .98, 1.02),
}
VOICE_MARKERS = {"Мама": "mother", "Даня": "danya"}


def contents(name):
    return json.loads((GAME / "content" / name).read_text(encoding="utf-8"))


def pronunciation(text):
    for written, spoken in (
        ("480 000 ₽", "четыреста восемьдесят тысяч рублей"),
        ("480 тысяч", "четыреста восемьдесят тысяч"),
        ("21:00", "девяти вечера"),
        ("3027", "три ноль два семь"),
        ("8041", "восемь ноль четыре один"),
        ("№ 014", "номер ноль четырнадцать"),
        ("№ 041", "номер ноль сорок один"),
        ("••", ""),
        ("−1", "минус один"),
    ):
        text = text.replace(written, spoken)
    return re.sub(r"\s+", " ", text).strip()


def lines(text, speaker):
    pieces = re.split(r"(?:^|\s)(Мама|Даня):\s*", text)
    if pieces[0].strip():
        yield speaker, pronunciation(pieces[0])
    for who, phrase in zip(pieces[1::2], pieces[2::2]):
        if phrase.strip():
            yield VOICE_MARKERS[who], pronunciation(phrase)


def cues():
    chapter = contents("dialogue/chapter.json")
    for call in contents("case.json")["calls"]:
        key, speaker = call["id"], call["character"]
        script = chapter["calls"][key]
        yield key + "-line", speaker, script["line"]
        for answer_id, _, reply in script["answers"]:
            yield key + "-" + answer_id, speaker, reply

    for key, recording in contents("dialogue/voice-extra.json").items():
        yield key, recording["speaker"], recording["text"]
    for quest in contents("continuation.json")["quests"]:
        yield "archive-" + quest["id"], "archivist", quest["clue"]


def run_ffmpeg(executable, args, data):
    return subprocess.run(
        [executable, "-hide_banner", "-loglevel", "error", *args],
        input=data,
        stdout=subprocess.PIPE,
        check=True,
    ).stdout


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("models", type=Path, help="Folder containing Denis and Dmitri ONNX models and configs.")
    args = parser.parse_args()
    target = GAME / "src" / "world" / "voices"
    target.mkdir(parents=True, exist_ok=True)
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    models = {
        name: PiperVoice.load(str(args.models / f"ru_RU-{name}-medium.onnx"))
        for name in ("denis", "dmitri")
    }
    total_seconds = 0
    total_bytes = 0
    count = 0
    for cue, role, text in cues():
        segments = []
        for speaker, words in lines(text, role):
            model, pitch, speed = ROLES[speaker]
            voice = models[model]
            wav = io.BytesIO()
            with wave.open(wav, "wb") as audio:
                voice.synthesize_wav(words, audio, syn_config=SynthesisConfig(
                    length_scale=speed, noise_scale=.50, noise_w_scale=.333
                ))
            pitch_rate = round(voice.config.sample_rate * pitch)
            filters = (
                f"asetrate={pitch_rate},aresample={SAMPLE_RATE},atempo={1 / pitch:.6f},"
                "highpass=f=70,acompressor=threshold=0.125:ratio=2:attack=10:release=95,"
                "alimiter=limit=0.85"
            )
            payload = run_ffmpeg(ffmpeg, ["-i", "pipe:0", "-af", filters, "-ar", str(SAMPLE_RATE),
                                         "-ac", "1", "-f", "s16le", "pipe:1"], wav.getvalue())
            if len(payload) < SAMPLE_RATE // 2:
                raise ValueError(f"Voice recording is unexpectedly short: {cue}")
            segments.append(payload)
        pause = bytes(round(.23 * SAMPLE_RATE) * 2)
        pcm = pause.join(segments)
        mp3 = run_ffmpeg(ffmpeg, ["-f", "s16le", "-ar", str(SAMPLE_RATE), "-ac", "1", "-i", "pipe:0",
                                 "-c:a", "libmp3lame", "-b:a", "48k", "-write_xing", "0",
                                 "-id3v2_version", "0", "-f", "mp3", "pipe:1"], pcm)
        (target / (cue + ".mp3")).write_bytes(mp3)
        total_seconds += len(pcm) / (2 * SAMPLE_RATE)
        total_bytes += len(mp3)
        count += 1
        print(cue, len(mp3), flush=True)
    print(f"{count} recordings, {total_seconds:.1f} seconds, {total_bytes:,} bytes", flush=True)


if __name__ == "__main__":
    main()
