# Twin Stars Adventure Series I — Randomizer
## Design & Requirements Document

**Current Version: 1.0.3**
**Last Updated: March 2026**

---

## What Is This?

This is a free, unofficial fan-made companion app for the card game **Twin Stars Adventure Series I**, designed by Jason Tagmire & Mike Mullins and published by Button Shy Games.

It is a single HTML file. You download it, open it in any web browser, and it works. No installation. No account. No server. No internet required to use it (though an internet connection is needed the first time to load the custom fonts — more on that below).

The app does three things:
1. Helps you pick a character combination and scenario to play — either randomly or by your own choice.
2. Times your session automatically while you play.
3. Tracks your results so you can see what you've played, how you did, and which difficulty levels you've conquered.

---

## Who Made It

Made with love by *THE* James Dean Cochran.

- Bluesky: https://bsky.app/profile/jamescochran.bsky.social
- Tip jar: https://ko-fi.com/jamescochran
- Community: https://discord.gg/aUBMvnu (Button Shy Discord)

This app is not affiliated with or endorsed by Button Shy Games. All Twin Stars characters, scenarios, and game content are the intellectual property of Button Shy Games and their creators.

---

## How It Works — Feature by Feature

### The Header

At the top of the app you'll see the game title styled to match the original card art — stacked, bold, white text on the dark background. The author credit (Jason Tagmire & Mike Mullins) sits above the title in small caps.

---

### Tab 1: Randomizer

This is the main screen. It has two ways to load a combination.

**Randomize Combination**
Click the big orange button. The app picks two unique characters at random, sorts them alphabetically, and picks one scenario at random. The result is displayed immediately and the timer starts.

**Manual Selection**
Three dropdowns: Character 1, Character 2, Scenario. The two character dropdowns filter each other in real time — if you pick Bood in the first dropdown, Bood disappears from the second. This makes it impossible to accidentally pick the same character twice. Click Load Mission to load your selection.

Whichever method you use, the dropdowns always update to reflect the currently loaded combination so you always know what's active.

---

### The Combination Card

Once a combination is loaded, a card appears showing:

- The two character names
- The scenario name
- Three difficulty badges: Easy, Medium, Hard — each showing your history at a glance:
  - **Dim dot** — never played this combo at this difficulty
  - **Teal dot** — you've won at least once at this difficulty
  - **Red dot** — you've played but never won at this difficulty

At the bottom of the card is the **timer**:
- Starts counting automatically the moment you load a combination
- **Restart** button on the left — asks "Are you sure?" before resetting to 00:00
- **Pause** button on the right — turns orange when paused, showing you the timer is stopped. Click again to Resume.

---

### Record Outcome

Below the combination card, a panel appears where you log the result of your play session:

- **Result**: Win or Loss
- **Difficulty**: Easy, Medium, or Hard
- **Save Record** — saves the result along with the elapsed playtime and a timestamp to your local browser storage. The combination card and history refresh immediately. The timer restarts so you can play the same combo again right away.

---

### Combo History

Below the Record Outcome panel, a table shows all past records for the currently loaded combination — Date/Time, Result, Difficulty, and Time played.

---

### Tab 2: Mission Log

The Mission Log shows every record you've ever saved, across all combinations, in one table: Date/Time, Characters, Scenario, Result, Difficulty, Time.

**Export** — Downloads all your records as a JSON file (`twin_stars_records.json`). Good for backup or sharing.

**Import** — Click to open a file picker. Select a previously exported JSON file. Records load automatically on selection — no second button. Every record is validated before being accepted. Invalid records are skipped and you're told how many were dropped. Records from before the timer feature was added will show "—" in the Time column.

**Clear All** — Deletes all records after a confirmation modal. This cannot be undone.

---

### Footer

The footer includes:
- Credit and tip/Ko-fi link
- Hot Dogs BGG link (James's other favorite Button Shy game)
- Button Shy Discord invite
- Buy Twin Stars (Button Shy store)
- BGG page for Twin Stars
- Full IP disclaimer

---

### Fonts and Offline Use

The app uses two fonts from Google Fonts: **Orbitron** (headings) and **Exo 2** (body text). These load automatically when you have an internet connection.

If you open the app offline and the fonts haven't loaded before, a small dismissable notice appears in the bottom-right corner explaining how to get the full visual experience. The app is fully functional without the fonts — it just looks a little different.

---

## Game Data (Series I)

### Characters (12)

Bood, Stag Solar, Fanoobia, Inpon Gol, Grant Rockgardner, Roux Jaezmina, Yanfred Jima, Saaze, Inzill Mey, Strezelsior, Kinglan, Brenimov-X

### Scenarios (6)

Escape The Brig!, Rule The World!, Stop The Virus!, Hunt The Bounty!, Steal The Plans!, Confine The Quarks!

### Known Future Content (not yet in app)

| Content | Details |
|---|---|
| Series II | 12 new characters, 6 new scenarios |
| Series III | 4 new characters, 2 new scenarios |
| Captain Crag | Fan-voted PNP Arcade promo character, compatible with any series |
| Droid Assistants | 3 cards adding a third character element to any scenario |
| SYZYGY Mode (S1) | Campaign mode — pay off debt to the Grosksh across linked scenarios |
| SYZYGY: Waypoints (S2) | Series II campaign mode, distinct from Series I SYZYGY |

---

## Data Model

Each saved record is stored as:

```
{
  characters: [string, string],  // Two unique characters, sorted alphabetically
  scenario:   string,
  result:     "Win" | "Loss",
  difficulty: "Easy" | "Medium" | "Hard",
  playtime:   number | null,     // Elapsed seconds. null/absent on pre-timer records
  timestamp:  string             // Human-readable local date/time string
}
```

All records are stored as a JSON array in the browser's `localStorage` under the key `"gameRecords"`. Nothing is ever sent anywhere.

### Combo Key

Combinations are identified internally by a string key:
```
[char1]|[char2]-[scenario]
```
Characters are always sorted before building this key so the order they were selected doesn't matter. **Note:** When expansion content is added, new character/scenario names must be checked to ensure they don't contain `|` or `-` or the key logic will need updating.

---

## Technical Details

- **Stack:** Plain HTML, CSS, vanilla JavaScript — no frameworks, no build tools
- **Single file:** Everything is in one `.html` file. Open it directly in any browser.
- **Storage:** `localStorage` only. Key: `"gameRecords"`. No data leaves the device.
- **No accounts:** Single-user, local tool.
- **Distribution:** Share the file directly. Works on desktop and mobile browsers.
- **Security:** All rendered data is HTML-escaped. Imported records are validated against known-good values before being accepted. localStorage errors are caught gracefully.

---

## Color Palette

| Variable | Value | Used For |
|---|---|---|
| `--bg-deep` | `#07091a` | Page background |
| `--bg-panel` | `#0e1228` | Panel backgrounds |
| `--bg-card` | `#131830` | Card/input backgrounds |
| `--border` | `#1e2d55` | Default borders |
| `--border-glow` | `#2a4a8a` | Highlighted borders |
| `--accent-orange` | `#ff6b35` | Primary actions, active tab |
| `--accent-teal` | `#00d4aa` | Wins, secondary actions, teal accents |
| `--accent-yellow` | `#f0b429` | Button Shy brand color — Discord link |
| `--text-primary` | `#e8eaf6` | Main text |
| `--text-muted` | `#7a88b0` | Secondary text |
| `--text-dim` | `#3e4f78` | Hints, labels, disabled |
| `--loss-color` | `#ff4455` | Losses, errors, danger actions |
| `#6aab96` | (inline) | *THE* in footer byline — muted seafoam |
| `#e8b800` | (inline) | Hot Dogs link — mustard yellow |

---

## External Links

| Label | URL |
|---|---|
| Bluesky (THE) | https://bsky.app/profile/jamescochran.bsky.social |
| Ko-fi | https://ko-fi.com/jamescochran |
| Hot Dogs (BGG) | https://boardgamegeek.com/boardgame/211988/hot-dogs |
| Button Shy Discord | https://discord.gg/aUBMvnu |
| Buy Twin Stars | https://buttonshygames.com/products/twin-stars |
| Twin Stars BGG | https://boardgamegeek.com/boardgame/231854/twin-stars-adventure-series-i |

---

## Roadmap

### v1.1 — Font Self-Containment *(low priority — working fallback exists)*
Embed Orbitron and Exo 2 as base64 directly in the HTML so the file works with perfect visuals even with no internet connection, ever. Currently deferred because the fallback notice is functional and embedding adds ~250KB to file size.

---

### v1.2 — Light / Dark Mode *(high priority)*
- Toggle between the current dark space theme and a light mode
- Light mode should feel designed — a proper alternate palette, not just inverted colors
- Defaults to the user's OS-level preference on first load
- Choice saved to localStorage between sessions

---

### v2.0 — Content Toggles *(must ship before any new content is added)*

A settings panel where you select which content you own. The randomizer and manual dropdowns only show content from enabled series. History and stats remain unified across everything.

| Toggle | Notes |
|---|---|
| Series I | Always on, default |
| Series II | Off by default |
| Series III | Off by default |
| Captain Crag | Adds to active character pool when on |
| Droid Assistants | Separate toggle — may need a new record field |
| SYZYGY Mode (S1) | Off by default |
| SYZYGY: Waypoints (S2) | Requires Series II enabled |

Also: when expansion content is added, `isValidRecord()` in the JavaScript must be updated to include new character and scenario names or imported records from those series will be silently rejected.

---

### v2.1 — Expansion Content *(requires v2.0)*
- Series II data (characters confirmed; scenarios still need research)
- Series III data (characters and scenarios need research)
- SYZYGY Mode (Series I) — determine what record fields are needed
- SYZYGY: Waypoints (Series II) — separate implementation
- Droid Assistant tracking — determine how to record Droid usage
- Captain Crag — add to character pool

---

### v3.0 — Record Keeping and Stats
- Delete individual records
- Edit individual records (fix a wrong result or difficulty)
- Optional notes field per record
- Sort and filter the history table
- Win rate per combination
- Completion tracking — how many of all possible combinations have been played
- Completion grid or visual checklist (396 combos in Series I alone — this will be compelling)
- "Suggest an unplayed combination" — weighted random that favors what you haven't tried

---

### v4.0 — Sharing and Convenience
- Shareable combination codes — a short string someone else can paste in to load the same combo
- Printable / human-readable export (not just raw JSON)
- Favorite or flag combinations to revisit
- Remember the last loaded combination when reopening the app
- "Play again" shortcut after saving a record

---

### Future / Unscheduled
- Community leaderboard or shared win rates (needs a backend — major scope change)
- Cloud sync across devices (also needs a backend)
- Two-player companion mode — both players tracking simultaneously
- Import merge — combine two record sets rather than replace one with the other
