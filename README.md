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

## Checks

```powershell
npm.cmd run typecheck
npm.cmd run lint
npx.cmd expo-doctor
```

## Project structure

- `app/`: root layout and Home, Workout, History, and Exercises routes.
- `components/`: shared text and screen wrappers.
- `components/home/`: the Home header, next workout, stats, weekly goal, and recent activity.
- `components/workout/`: exercise cards, set rows, the options modal, and shared workout types.
- `assets/workout/`: set-marker SVGs from Figma.
- `assets/home/`: profile, workout ring, and weekly goal SVGs from Figma.
- `assets/fonts/`: Inter font and its license.

Workout state and update functions live in `app/(tabs)/workout.tsx`. Set values are held in memory and reset when the app restarts. Home displays sample workout, stats, calendar, and activity values from Figma. Its buttons open the Workout and History tabs. History and Exercises are currently placeholder screens.
