# PlantCare AI

PlantCare AI is a React Native mobile app for basic plant disease diagnosis.

You can capture a leaf image (or choose one from gallery), send it to a prediction API, review the result with confidence + recommendations, and save that diagnosis in local history.

## What is in this repo

This repository contains the mobile app.

The model backend is not included here. The app expects an external API endpoint at:

`http://localhost:8000/predict`

## Current features

- Login and signup screens with local session persistence using AsyncStorage
- Main tab layout with Home, My Plants, Diagnose, Community, Store, and Profile
- Diagnose flow with camera/gallery image input
- Remote prediction call with multipart upload (`file` + `device_id`)
- Result screen with mapped disease details and confidence display
- Save/remove diagnosed plants in local storage

## Main files

- `App.tsx` - app root + navigation container
- `navigation/AppNavigator.js` - auth flow and session restore
- `navigation/MainTabNavigator.js` - tab navigation and Diagnose stack
- `screens/DiagnoseScreen.js` - capture and analyze flow
- `screens/ResultScreen.js` - diagnosis output UI
- `components/PlantCamera.js` - camera and gallery picker
- `services/MLService.js` - backend request and response normalization
- `services/DeviceIdService.js` - persistent device id helper
- `store/plantsStorage.js` - diagnosis history storage

## Run locally

Requirements:

- Node.js 20+
- npm or yarn
- Android Studio (Android)
- Xcode + CocoaPods (iOS on macOS)

Install:

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

## Backend request/response format used by the app

Request:

- Method: `POST`
- URL: `/predict`
- Content-Type: `multipart/form-data`
- Fields: `file`, `device_id`

Response fields supported by the client:

- Class: `prediction` or `Prediction` or `class` or `Class`
- Confidence: `confidence` or `Confidence`

The client converts confidence to a numeric 0-1 range for internal use.

## Android local API tip

If backend is running on your machine at port 8000, use:

```bash
adb reverse tcp:8000 tcp:8000
```

## Notes

- Auth is currently local/demo logic (not server-based auth).
- Diagnosed plants are stored locally in AsyncStorage.
- API URL is hardcoded in `services/MLService.js`.

## Commands

```bash
npm start
npm run android
npm run ios
npm test
```
