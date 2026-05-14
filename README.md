# PlantCare AI

This is a React Native app for plant disease diagnosis.

The app lets a user:
- take a photo (or pick one from gallery),
- send it to a prediction API,
- see the disease result with confidence and care suggestions,
- save the diagnosis in a local history.

## Current scope

This repository is the mobile app only.
The ML model server is expected to run separately and expose a `/predict` endpoint.

## Main app flow

1. User logs in (local simulated auth).
2. User opens Diagnose and captures/selects a leaf image.
3. App uploads the image to the backend.
4. App shows diagnosis, confidence, and recommendations.
5. User can save the result to My Plants.

## Tech stack

- React Native
- React Navigation
- AsyncStorage
- Axios
- react-native-image-picker
- react-native-vector-icons

## Important files

- `App.tsx` - app entry point
- `navigation/AppNavigator.js` - auth gate + session restore
- `navigation/MainTabNavigator.js` - tab and stack navigation
- `screens/DiagnoseScreen.js` - capture and analysis trigger
- `screens/ResultScreen.js` - diagnosis result UI
- `components/PlantCamera.js` - camera/gallery capture component
- `services/MLService.js` - API call and response mapping
- `services/DeviceIdService.js` - persistent device id helper
- `store/plantsStorage.js` - saved diagnoses storage

## Setup

Prerequisites:
- Node.js 20+
- npm or yarn
- Android Studio (for Android)
- Xcode + CocoaPods (for iOS on macOS)

Install dependencies:

```bash
npm install
```

Start Metro:

```bash
npm start
```

Run Android:

```bash
npm run android
```

Run iOS (macOS only):

```bash
npm run ios
```

## Backend API expectations

Default API URL is set in `services/MLService.js`:
- `http://localhost:8000/predict`

Request format:
- Content-Type: `multipart/form-data`
- Fields:
  - `file` (image)
  - `device_id` (string)

Accepted response patterns (any one is fine):
- class field: `prediction` / `Prediction` / `class` / `Class`
- confidence field: `confidence` / `Confidence`

The app normalizes confidence into a number between 0 and 1.

## Local backend on Android

If your backend runs on your laptop at port 8000 and you test on Android device/emulator, run:

```bash
adb reverse tcp:8000 tcp:8000
```

Then keep API URL as `http://localhost:8000/predict`.

## Known limitations

- Auth is demo-only (no real auth provider yet).
- Plant history is local to device (`AsyncStorage`).
- API URL is currently hardcoded in `MLService`.

## Useful commands

```bash
npm start
npm run android
npm run ios
npm test
```

## License

No license file is included yet.
If you plan to open-source this project, add a `LICENSE` file.
