# Twin Stars Randomizer — Security & Risk Document

**Applies to: v1.0.3 (single HTML file, local distribution)**
**Audience: Developers maintaining or extending this codebase**

---

## Overview

This app has an unusually low threat surface. It runs as a local HTML file opened directly in the browser, has no server, no user accounts, no network requests beyond Google Fonts, and stores only game records. It is not a web application in the traditional sense. Most standard web security concerns do not apply here.

That said, there are a small number of real considerations worth understanding.

---

## Threat Surface

### 1. localStorage — Data Storage

**What it is:** All game records are stored in the browser's localStorage under the key `"gameRecords"` as a JSON string.

**Risks:**
- localStorage is readable by any JavaScript running on the same origin. Since this is a `file://` origin, only this file can read it — no other website can access it.
- localStorage is not encrypted. Anyone with physical access to the machine and browser can read the records via the browser's developer tools.
- If localStorage becomes full (typically 5–10MB depending on the browser), writes will fail. The app catches this and shows an error toast rather than crashing silently.
- If the stored JSON is corrupted (e.g., manually edited incorrectly), the app catches the parse error on load and starts with an empty record set rather than crashing.

**Verdict:** Low risk for this use case. Records are game scores, not sensitive personal data.

---

### 2. innerHTML and XSS

**What it is:** The app uses `innerHTML` to render combination and history data into the page.

**What was done:** All data is passed through an `esc()` helper function before being inserted into HTML. This function creates a temporary DOM element, sets its `textContent` (which is always safe), and reads back the escaped `innerHTML`. This prevents any HTML or JavaScript in data values from being interpreted by the browser.

```javascript
function esc(str) {
  const d = document.createElement("div");
  d.textContent = String(str);
  return d.innerHTML;
}
```

**Where this matters most — import:** When a user imports a JSON file, those records are passed through `isValidRecord()` before being accepted. This function checks that every field matches known-good values from the game's fixed data sets. A record with a character name of `<script>alert('xss')</script>` would be rejected entirely, not escaped-and-displayed.

**Residual risk:** The `timestamp` field is accepted from imported records as a plain string without format validation. It is escaped via `esc()` before rendering, so it cannot execute code — but a malicious file could cause a weird-looking timestamp to appear in the history table. This is cosmetic only.

**Verdict:** Handled. The combination of input validation on import and escaping on render means injected content cannot execute.

---

### 3. File Import — Malicious JSON

**What it is:** The user can import a `.json` file to replace their records.

**Risks:**
- A malicious actor could craft a JSON file and convince the user to import it.
- The file could contain garbage data intended to corrupt the record store.
- The file could attempt HTML injection (mitigated by `esc()` and `isValidRecord()`).

**What was done:**
- `isValidRecord()` validates every field of every imported record against known-good values. Invalid records are silently skipped and the user is told how many were dropped.
- The import replaces the current records entirely — this is intentional and expected behavior, but it means a bad import wipes existing data. Users should export before importing if they want to preserve history.
- The file is read as text and parsed as JSON. A non-JSON file will throw a parse error, which is caught and shown as a toast.

**Important — expansion content:** `isValidRecord()` currently validates characters and scenarios against the Series I data set only. When Series II, III, Captain Crag, or any other content is added to the app, the `CHARACTER_SET` and `SCENARIO_SET` constants in the JavaScript must be updated to include the new values. If they are not updated, records from those series will pass silently through the import as invalid and be dropped, with no explanation beyond the skipped count in the toast.

**Verdict:** Low risk. Validation is strict. The only realistic attack scenario is a user being socially engineered into importing a file that wipes their records — the data itself (game scores) has no value to an attacker.

---

### 4. Google Fonts — External Dependency and Privacy

**What it is:** The app loads Orbitron and Exo 2 from `fonts.googleapis.com`.

**Risks:**
- This is the only external network request the app makes.
- When the browser fetches the fonts, Google receives the user's IP address, browser user agent, and referrer. This is standard for any Google Fonts usage and is governed by Google's privacy policy.
- If Google Fonts is unavailable (offline, blocked, or service outage), the app falls back to system fonts and shows a notice to the user.
- Google could theoretically change or remove the font files. This would not break the app's functionality, only its appearance.

**Mitigation options:**
- Fonts could be embedded as base64 to eliminate this dependency entirely. This was explored and is technically feasible but adds ~200–300KB to the file size. It remains an option for a future version.

**Verdict:** Known and accepted tradeoff. No user credentials or game data are transmitted. The only exposure is the IP address, which is unavoidable for any internet request.

---

### 5. Math.random() — Randomization

**What it is:** The randomizer uses `Math.random()` to shuffle characters and pick a scenario.

**Risk:** `Math.random()` is not cryptographically secure. It is theoretically predictable given knowledge of the browser's internal state.

**Verdict:** Not a concern. This is a board game companion tool, not a gambling or security application. `Math.random()` is entirely appropriate here.

---

### 6. setInterval — Timer Accuracy

**What it is:** The playtime timer uses `setInterval` with a 1000ms tick.

**Risk:** `setInterval` is not perfectly accurate — it can drift slightly, especially when the browser tab is in the background (browsers throttle background timers to save battery). Over a typical 20–45 minute game session, drift is negligible in practice.

**Verdict:** Acceptable for a game timer. Not a correctness concern.

---

### 7. Combo Key Collisions

**What it is:** Combinations are identified by a string key in the format `char1|char2-scenario`.

**Risk:** If a character name or scenario name ever contained the characters `|` or `-`, the key could theoretically collide with another combination. With the current fixed data set, no names contain these characters, so there is no collision risk.

**Note for future versions:** If expansion content is added, new character and scenario names should be checked to ensure they don't contain `|` or `-`. Alternatively, the separator could be changed to something less likely to appear naturally, such as `\x00` (null byte).

**Verdict:** Not a current risk. Worth checking when adding expansion content.

---

## What This App Does NOT Do

For clarity, the following concerns that apply to typical web applications are **not relevant here:**

- **SQL injection** — No database, no queries.
- **CSRF** — No server, no state-changing requests.
- **Authentication / session hijacking** — No accounts, no sessions.
- **HTTPS / TLS** — No network communication beyond font loading.
- **Server-side vulnerabilities** — No server exists.
- **Third-party scripts / supply chain** — No JavaScript libraries loaded from external sources.

---

## Summary Table

| Item | Risk Level | Status |
|---|---|---|
| localStorage data exposure | Low — game scores only | Accepted |
| localStorage corruption on load | Low | Handled — try/catch, graceful fallback |
| localStorage quota exceeded | Low | Handled — error toast |
| XSS via innerHTML | Low | Handled — esc() on all rendered data |
| XSS via import | Low | Handled — isValidRecord() validation |
| Malicious import file | Low | Handled — validation + user controls import |
| Google Fonts privacy | Low | Accepted — IP only, no game data |
| Google Fonts unavailability | Low | Handled — fallback fonts + user notice |
| Math.random() predictability | Not applicable | Accepted |
| Timer drift | Not applicable | Accepted |
| Combo key collision | Low (future risk) | Monitor when adding expansion content |
