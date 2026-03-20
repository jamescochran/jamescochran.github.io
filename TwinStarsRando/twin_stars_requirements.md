# Twin Stars Randomizer — Requirements List

Unprioritized. Not all items will ship. This is a living document.

---

## Content

- Add Series II characters (12) and scenarios (6)
- Add Series III characters (4) and scenarios (2)
- Add Captain Crag as an optional promo character
- Add Droid Assistant tracking
- Add SYZYGY Mode (Series I) support
- Add SYZYGY: Waypoints (Series II) support
- Research and confirm all Series II scenario names
- Research and confirm all Series III character and scenario names
- Research and confirm exact SYZYGY and Waypoints rules to determine record model impact

---

## Settings / Content Toggles

- Settings screen where the user selects which content they own
- Toggle Series I on/off (on by default, cannot be the only thing disabled)
- Toggle Series II on/off
- Toggle Series III on/off
- Toggle Captain Crag on/off
- Toggle Droid Assistants on/off
- Toggle SYZYGY Mode on/off
- Toggle SYZYGY: Waypoints on/off (requires Series II enabled)
- Content selection persists to localStorage between sessions
- Randomizer and manual selection only pull from enabled content

---

## Record Keeping

- ~~Delete individual records (no confirmation)~~ ✅ Done
- Edit individual records (fix wrong result, difficulty, or playtime)
- Optional notes field per record
- Sort history table by any column
- Filter history table by result, difficulty, character, or scenario
- Records export with date-stamped filename ✅ Done
- Import correctly handles records from all enabled content series
- Import merge — combine an imported file with existing records rather than replace

---

## Timer

- ~~Auto-start when combo loads~~ ✅ Done
- ~~Pause / Resume~~ ✅ Done
- ~~Restart with confirmation~~ ✅ Done
- ~~Playtime saved with each record~~ ✅ Done

---

## Randomizer / Selection

- ~~Randomize button generates a valid unique character pair and scenario~~ ✅ Done
- ~~Manual selection with bidirectional character filtering~~ ✅ Done
- ~~Manual panel hides after randomizing, restores via ghost button~~ ✅ Done
- ~~Dropdowns always reflect the currently loaded combination~~ ✅ Done
- ~~Result and difficulty dropdowns remember last used values~~ ✅ Done
- "Suggest an unplayed combination" weighted random — favors what hasn't been tried
- Favorite / flag combinations to revisit later
- Remember last loaded combination when reopening the app
- "Play again" shortcut button after saving a record

---

## Stats and Completion

- ~~Play count shown on combination card~~ ✅ Done
- ~~Unplayed combinations list with progress counter~~ ✅ Done
- Win rate per combination
- Win rate per scenario across all character pairs
- Win rate per character across all scenarios
- Overall completion percentage
- Completion grid — visual checklist of all possible combinations
- Average playtime per combination
- Average playtime overall
- Longest and shortest recorded sessions
- Most played combination
- Most successful combination

---

## UI / UX

- ~~Dark mode (current default)~~ ✅ Done
- Light mode toggle
- Respects OS-level dark/light preference on first load
- Theme preference saved to localStorage
- ~~Auto-scroll to combo card on mobile after loading~~ ✅ Done
- ~~Play count badge on combo card~~ ✅ Done
- Accessibility — all interactive elements keyboard navigable
- Accessibility — screen reader friendly labels on buttons and controls

---

## Fonts and Assets

- ~~Fonts embedded as base64 (fully offline)~~ ✅ Done
- ~~PWA installable from hosted version~~ ✅ Done
- ~~Custom app icon~~ ✅ Done
- Improved app icon (hand-designed or illustrated)

---

## Export / Sharing

- Printable / human-readable export (PDF or formatted HTML)
- Shareable combination code — short string to send to another player to load the same combo
- QR code generation for a combination

---

## Hosting and Distribution

- ~~Hosted at jamescochran.github.io/TwinStarsRando~~ ✅ Done
- ~~Downloadable as a single HTML file~~ ✅ Done
- ~~Personal homepage at jamescochran.github.io~~ ✅ Done
- Keep single-file distribution working alongside hosted PWA version
- Service worker cache versioning — force update when new version is deployed

---

## Future / Big Ideas

- Community leaderboard (requires backend)
- Shared win rates across all players (requires backend)
- Cloud sync across devices (requires backend)
- Two-player companion mode — both players tracking simultaneously on separate devices
- Account system for cloud features (requires backend)
- Push notifications for session reminders (PWA feature)
