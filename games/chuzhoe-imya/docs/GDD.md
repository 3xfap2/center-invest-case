# «Чужое имя» — game design brief (v1, 21 Nov 2026)

For: Codex, who builds the whole game.
Copy this file into the repo as `docs/GDD.md`. It is the base for `WORLD.md`, `STYLE.md` and `STORY-CH1.md`.

## 1. In one line

You are a trainee in a bank's anti-fraud team. Three hours before a youth festival pays for its equipment, the system flags the transfer. Find out who is really behind it, without ruining the festival or blaming the wrong person.

- **Profession:** bank fraud analyst (anti-fraud team).
- **Engine:** Three.js (TypeScript + Vite).
- **Target:** desktop browser, keyboard and mouse.
- **Length:** 15–20 minutes (one chapter).
- **Audience:** ages 12–15. All player text is in Russian; no long dash «—».

## 2. Why this game (pitch logic for the jury)

- **A real job, shown through its real tools:**
  - a transaction monitoring screen with risk flags;
  - client calls;
  - hold / approve / block decisions;
  - a written report.

  Every rule shown has a source (section 9).
- **The hard part of the job is the core mechanic:** suspicion is not evidence. Blocking honest payments hurts people too.
- **Real-life value for teens:** the "someone else's name" belongs to a 15-year-old who was paid to "rent out" his card. That makes him a money mule ("дроп"). The game teaches: never give your card to anyone.

## 3. Setting and characters

**Setting:** a small fictional town (for example, «Заречный»). The anti-fraud office of a fictional bank on a late evening (the bank name is for the team to decide: fictional by default). The youth festival is tomorrow.

| Character | Who | Wants | Secret / role in the plot |
|---|---|---|---|
| **The player** (nickname) | anti-fraud trainee, first solo case | to prove themselves | — |
| **Мария Сергеевна** | head of the anti-fraud team, the player's boss | a fast, clean result | pushes for a quick block; tests whether you can justify a decision |
| **Олег** | festival organiser (youth centre) | pay today, or the equipment goes to someone else | honest but careless; insists the transfer is fine |
| **Ирина** | the youth centre's accountant | to do her job right | changed the payee details after an email "from the contractor"; ashamed when she finds out |
| **Виктор** | the real equipment contractor | to get paid, to deliver on time | pushes you to hurry, but **never changed his details**: the key contradiction |
| **Даня, 15** | festival volunteer | some easy pocket money | "rented out" his card to a Telegram "job" for 3,000 ₽; **looks like the suspect, is a victim** |

**Unseen antagonist:** the scammer who faked Виктор's email (one letter different in the domain) and controls Даня's card.

## 4. The chapter in 12 beats (≈15–20 min)

Game time runs from 18:00 to 21:00 (the payment deadline). It moves forward with **actions**, not real time: a call costs 15 min, inspecting a transaction 5 min, a wrong link on the board 5 min. So there is pressure without twitch reflexes.

1. **Cold open (first 60 s).** The player arrives at their desk. The monitor flashes: a 480,000 ₽ transfer from the youth centre to a new recipient, risk 87/100. The phone rings: Олег, "Проведите срочно!". The clock shows 3:00 left.
2. **Terminal.** Inspect the transfer → evidence cards appear:
   - the recipient was never paid before;
   - the account was opened 5 days ago;
   - the details differ from last month's payment to the same contractor.
3. **Call Олег.** "The contractor sent new details." → card.
4. **Call Ирина.** She shows the email. → card: the sender domain looks almost right (one letter changed).
5. **Call Виктор.** "We never changed our details. But pay today, or I give the equipment to another event!" → card. **Contradiction 1:** the email vs. Виктор's words.
6. **Trace the recipient.** An earlier, smaller payment from the same scheme went to a card in the name of Даниил К., 15. → **prime suspect.**
7. **Pressure.** Мария Сергеевна: "Block everything, report the boy, we're done." This is the trap: blocking everything and accusing Даня leads to a bad ending.
8. **Call Даня** (his mother joins the call). He's scared. He tells you about a Telegram "job": "дай карту на неделю — получи 3000". → card. **Contradiction 2:** Даня didn't receive or control the money.
9. **Evidence board.** Connect the cards into the chain: fake email → new details → recipient → Даня's card → cash-out. Contradictions 3 and 4 open here: the dates, and who controls the card.
10. **Decisions.** 4 transactions on the screen:
    - (a) the 480k payment to the new details → **hold / block**;
    - (b) a payment to Виктор's real, old details → **approve**: this saves the festival;
    - (c) incoming money on Даня's card → **block the card and contact the family**, not "report the criminal";
    - (d) an honest refund from the youth centre to a volunteer for bus tickets → **approve**: this is the trap for over-suspicious players.
11. **Report to Мария Сергеевна.** For each decision, pick the 1–2 evidence cards that justify it. Decisions without evidence are marked "подозрение, а не доказательство".
12. **Ending.** One short card per character shows what happened to them: festival held or cancelled, Даня safe or wrongly accused, Ирина's mistake, Виктор paid or not. Then a career screen: what a fraud analyst really does, where to study, with sources.

**Endings (from the decisions and the report):**
- **Чистая работа:** fraud stopped, the festival held, Даня protected, the report justified.
- **Перестраховка:** honest payments blocked → the festival is delayed, people are hurt.
- **Деньги ушли:** the fraud was approved → the youth centre loses the money.
- **Чужая вина:** Даня is reported as the criminal → the real scammer gets away.

## 5. Core mechanics (exact rules)

**A. The office (Three.js).**
- One room, walked with WASD and the mouse.
- Hotspots:
  - the desk / terminal;
  - the phone;
  - the whiteboard (evidence board);
  - Мария Сергеевна's desk;
  - the window with the clock;
  - the coffee machine, for one small optional chat.
- `E` interacts.
- Characters are present as low-poly figures (Мария in the office) or on video calls (the others, shown on a monitor or phone screen).
- Atmosphere: evening light, a ticking clock, phone vibration, rain on the window.

**B. Terminal (monitoring).**
- A list of transactions with a risk score and **factor tags** (new recipient, new account, changed details, amount unusual, linked to a known case).
- Inspecting costs 5 min and adds evidence cards.

**C. Calls (dialogue).**
- 2–3 answer choices per line.
- **"Press" options** appear only when the player holds a card that contradicts what the character says. This is the hook that connects the board to the dialogue.

**D. Evidence board.**
- About **12 cards**: 8 real clues + 2–3 red herrings + 1 "Даня" card.
- Click two cards to link them. The game answers "подтверждает", "противоречит" or "нет связи".
- **4 key contradictions** solve the case. A wrong link costs 5 min, so random clicking doesn't pay.

**E. Decisions and report** (beats 10–11). Each transaction gets approve / hold / block, plus 1–2 justifying cards.

**Difficulty:**
- `easy`: 4 h of game time, hint highlights on useful cards, risk factors explained.
- `normal`: 3 h, no highlights.
- `hard`: 2.5 h, one extra red-herring card, one extra pressure call from Олег.

**Save:**
- a checkpoint after every beat;
- flags for the future: `danya_protected`, `festival_held`, `blocked_honest`, `report_quality`.

**Achievements (ids):**
- `ch1_clean` — "Чистая работа";
- `ch1_no_overblock` — no honest payment blocked;
- `ch1_danya_safe`;
- `ch1_fast` — finished with 1 h or more left;
- `ch1_full_report` — every decision justified.

## 6. The first 3 minutes (what the jury sees)

1. 0:00 — Dark office, the monitor glows red, the phone vibrates on the desk.
2. 0:20 — Олег on the line, angry and rushed. The 3:00 clock starts.
3. 1:00 — The terminal: the first 3 cards appear with a sound.
4. 2:00 — Виктор says "we never changed our details". The first contradiction lights up on the board.
5. 3:00 — The jury already knows the stakes, the job, and the mystery.

## 7. Architecture: two layers

> **Update:** Codex builds the whole game (both layers). Keep the two layers separate anyway: it makes testing easy and is a strong answer for the jury. Paths are relative to the game's folder.

- **World layer (`src/world`, `content/dialogue`, art):**
  - the 3D office, movement, hotspots, characters, calls UI shell, dialogue content, sound;
  - the ending and career screens;
  - integration with the site bridge (`ns-bridge.js`).
- **Case layer (`src/case`, `content/case.json`):**
  - the case engine (pure TypeScript, unit-tested): game clock, transactions, factors, evidence cards, links → confirms/contradicts/none, unlocking "press" options, decisions, report scoring, ending selection, difficulty, the save/flags payload;
  - the **Terminal**, **Evidence board** and **Report** UIs as HTML overlays (the same style tokens).
- **Contract between them:** `content/case.json` (validated by a schema) and one module API:

```ts
// src/case/index.ts
export function createCase(data: CaseData, difficulty: 'easy' | 'normal' | 'hard', save?: CaseSave): CaseStore;
// CaseStore exposes: state (clock, cards, links, decisions), and actions:
//   inspect(txId), addCard(cardId), link(cardA, cardB) -> 'confirms' | 'contradicts' | 'none',
//   pressOptions(characterId) -> string[]  (dialogue options unlocked by contradictions),
//   decide(txId, 'approve' | 'hold' | 'block', reasons: string[]), report() -> { ending, stars, flags, achievements }
//   toSave() -> CaseSave
// UI: <Terminal store/>, <EvidenceBoard store/>, <Report store/>  (React components mounted over the canvas)
```

**The world calls the case engine. The case engine never touches Three.js.** So the logic is tested on its own, without the 3D scene.

## 8. Art and assets (first list; details go in `docs/ASSETS.md`)

- **Office:** a low-poly furniture kit (desks, chairs, monitors, whiteboard, window, plants), e.g. Kenney Furniture Kit (CC0).
- **Characters:** low-poly rigged humans with idle, talk and walk animations, e.g. Quaternius (CC0). 5 different looks.
- **UI:** made in code (HTML/CSS) with `STYLE.md` tokens. Icons from an open set (MIT/ISC licence).
- **Sound:**
  - phone ring and vibration, keyboard, a clock tick, rain, UI clicks, a "contradiction" sting;
  - one calm evening music loop.

  CC0 or properly licensed only.
- **Fonts:** with Cyrillic, OFL (Google Fonts).
- Every file goes in `CREDITS.md`. AI-generated files are marked as AI.

## 9. Profession facts: must be checked before they go in the game or on slides

These are **ideas for what to show**. Each needs a real, current source in `docs/SOURCES.md` before use (official laws, the Bank of Russia, ФинЦЕРТ, fincult.info, professional standards). **Do not present any of these as fact until checked:**

- [ ] how banks flag suspicious transfers (anti-fraud monitoring, risk signs);
- [ ] the bank's right or duty to suspend a suspicious transfer, and for how long;
- [ ] the Bank of Russia database of fraud cases, and how banks use it;
- [ ] the "changed payee details" scheme (fake email from a supplier) as a real, common fraud type;
- [ ] money mules (дропы): how teens are recruited, and the legal consequences in Russia;
- [ ] what a fraud analyst's job is, and where to study for it (Rostov region).

## 10. If time runs short (cut in this order)

1. The coffee machine chat and the extra pressure call.
2. Walking: replace it with a fixed camera and clickable hotspots in the same 3D office.
3. Achievements beyond `ch1_clean`.
4. Red herrings down from 3 to 1.

**Never cut:** the cold open, the 4 contradictions, the decisions with the trap (d), the report, and the per-character ending.
