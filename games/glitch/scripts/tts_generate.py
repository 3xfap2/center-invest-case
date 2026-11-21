"""Озвучка реплик Ирины, Тимура и Лиса нейросетью Silero (snakers4/silero-models, CC BY-NC-SA 4.0).

Как перегенерировать (Python 3.12 с torch для CPU, ffmpeg в PATH, модель v4_ru.pt скачана заранее):
    node scripts/voice-lines.mjs > lines.json
    python scripts/tts_generate.py --lines lines.json --model v4_ru.pt --out public/voice

Пишет public/voice/<ключ>.mp3 и public/voice/manifest.json. Ключ — хэш «кто + текст» (src/core/voiceKey.js).
"""
import argparse
import json
import os
import subprocess
import sys
import tempfile
import wave

import numpy as np
import torch

# Голоса и манера речи персонажей (SSML prosody: rate и pitch).
VOICES = {
    'irina': {'speaker': 'baya', 'rate': 'medium', 'pitch': 'medium'},
    'timur': {'speaker': 'aidar', 'rate': 'fast', 'pitch': 'medium'},
    'lis': {'speaker': 'eugene', 'rate': 'slow', 'pitch': 'low'},
}

# Как читать то, что модель не знает.
SAY = {
    'tester_02': 'тестер ноль два',
    '«': '',
    '»': '',
    '„': '',
    '“': '',
    '…': '...',
}

SAMPLE_RATE = 48000


def to_ssml(text, v):
    for a, b in SAY.items():
        text = text.replace(a, b)
    text = text.replace('&', ' и ').replace('<', '').replace('>', '')
    return f'<speak><prosody rate="{v["rate"]}" pitch="{v["pitch"]}">{text}</prosody></speak>'


def write_wav(path, audio):
    pcm = (np.clip(audio, -1, 1) * 32767).astype(np.int16)
    with wave.open(path, 'wb') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SAMPLE_RATE)
        w.writeframes(pcm.tobytes())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--lines', required=True)
    ap.add_argument('--model', required=True)
    ap.add_argument('--out', required=True)
    args = ap.parse_args()

    with open(args.lines, encoding='utf-8') as f:
        lines = json.load(f)
    os.makedirs(args.out, exist_ok=True)

    torch.set_num_threads(max(1, (os.cpu_count() or 2) - 1))
    importer = torch.package.PackageImporter(args.model)
    model = importer.load_pickle('tts_models', 'model')
    model.to(torch.device('cpu'))

    manifest = {}
    with tempfile.TemporaryDirectory() as tmp:
        for i, ln in enumerate(lines, 1):
            v = VOICES[ln['who']]
            audio = model.apply_tts(
                ssml_text=to_ssml(ln['text'], v),
                speaker=v['speaker'],
                sample_rate=SAMPLE_RATE,
                put_accent=True,
                put_yo=True,
            ).numpy()
            wav = os.path.join(tmp, ln['key'] + '.wav')
            write_wav(wav, audio)
            mp3 = os.path.join(args.out, ln['key'] + '.mp3')
            # моно 24 кГц, 48 кбит/с: голосу хватает, файлы маленькие
            subprocess.run(
                ['ffmpeg', '-y', '-loglevel', 'error', '-i', wav, '-ac', '1', '-ar', '24000', '-b:a', '48k', mp3],
                check=True,
            )
            manifest[ln['key']] = {'file': f'voice/{ln["key"]}.mp3', 'sec': round(len(audio) / SAMPLE_RATE, 2)}
            print(f'[{i}/{len(lines)}] {ln["who"]}: {ln["text"][:60]}', flush=True)

    with open(os.path.join(args.out, 'manifest.json'), 'w', encoding='utf-8') as f:
        json.dump(manifest, f, ensure_ascii=False, indent=1)
    print('готово:', len(manifest), 'файлов')


if __name__ == '__main__':
    sys.exit(main())
