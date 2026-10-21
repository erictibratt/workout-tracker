# Workout Tracker

Mobile workout tracker built with Expo SDK 57, React Native, TypeScript, and Expo Router.

## Development

Use Node.js 22.13 or newer and npm. From the project directory:

```powershell
npm.cmd ci
npm.cmd start
```

Scan the QR code with an Expo Go build that supports SDK 57. Keep your phone and computer on the same Wi-Fi.

To rebuild the development cache:

```powershell
npm.cmd start -- --clear
```

For a browser preview, run `npm.cmd run web`.

## Install on iPhone for free

Open the deployed website in Safari while connected to the internet. Wait for **Ready offline**, then tap **Share → Add to Home Screen** and enable **Open as Web App** if prompted. Launch the app from that icon once while online before using it at the gym. No App Store account or running computer is needed.

The web version automatically saves your current exercises, weights, repetitions, completed sets, and timer in storage on this device. A running timer continues across reloads; pause it when you finish. Data is not synced between devices, Safari tabs and an installed app can have separate storage, and clearing website data removes saved workouts. Use a normal Safari session, not Private Browsing. History and Exercises remain placeholder tabs; this saves the current workout rather than an archive of finished sessions.

Build and test the offline production version:

```powershell
npm.cmd run build
npm.cmd run preview
```

Open `http://127.0.0.1:8083`, wait for **Ready offline**, then test with the browser's network set to Offline. `dist/` contains the complete static website, manifest, home screen icons, and a versioned service worker. Deploy this directory at the root of an HTTPS origin that serves `/workout`, `/history`, and `/exercises` from the matching HTML files. Development mode does not register the service worker. Updates download in the background and activate after all open app windows are closed.

Hosting identity is recorded in `.openai/hosting.json`. The Sites publishing source is prepared separately from this repository, preserving this repository's Git history.

## Checks

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
npx.cmd expo-doctor
```

## Project structure

- `app/`: root layout and Home, Workout, History, and Exercises routes.
- `components/`: shared text and screen wrappers.
- `components/home/`: the Home header, next workout, stats, weekly goal, and recent activity.
- `components/workout/`: exercise cards, set rows, the options modal, and shared workout types.
- `assets/workout/`: muscle map, button icons, timer icon, and set-marker SVGs from Figma.
- `assets/home/`: profile, workout ring, and weekly goal SVGs from Figma.
- `assets/fonts/`: Inter font and its license.

Workout state and update functions live in `app/(tabs)/workout.tsx`. The Workout tab supports editing and completing sets, adding and removing sets and exercises, exercise instructions, and a timer with pause and resume. The exercise picker currently contains three biceps exercises; the muscle map is the static biceps illustration supplied by Figma. Workout values and timer state persist locally on both native and web platforms. Home displays sample workout, stats, calendar, and activity values from Figma. Its buttons open the Workout and History tabs. History and Exercises are currently placeholder screens.

## Local data storage

iOS and Android use `expo-sqlite` with an on-device `workout-tracker.db` database. The `app_state` table stores the current exercises and timer as validated JSON in separate rows, with a primary key and update timestamp. SQL parameters are bound, writes finish in order, and existing rows are updated rather than duplicated. Opening the database creates the table only if it is missing; it does not reset saved data. SQLite errors are shown in the app.

`storage/persistentStorage.web.ts` keeps the web app on its existing `localStorage` keys, preserving previously saved workouts. Metro selects this web implementation so SQLite's experimental web/WASM dependencies and cross-origin isolation headers are not needed. Data remains local to each installation and is not synced between the native and web versions. No server or paid service is needed for either storage backend.

`npm.cmd test` runs the SQL against a real SQLite database using Node.js, including reopening the database, rapid edits, parameter binding, and recovery after failures. An iOS/Android device is still needed to verify the native Expo integration end to end.
