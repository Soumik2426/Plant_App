# PlantCare AI — Mobile App

AI-assisted plant disease detection and plant-care companion built with React Native. Capture leaf images from camera or gallery, upload to a remote model API for inference, view diagnosis details and recommendations, and save results to a personal collection.

## Key Features

- On-device camera and gallery image capture (`components/PlantCamera.js`).
- Remote model inference via a multipart API upload (`services/MLService.js`).
- Diagnosis results with mapped disease details, severity, and recommendations (`screens/ResultScreen.js`).
- Persistent user session (login/signup) stored with `AsyncStorage` (`navigation/AppNavigator.js`).
- Save and manage diagnosed plants history (`store/plantsStorage.js`).
- Additional app areas: Home, Community feed, Store catalog, Profile.

## Project Structure (important files)

- `App.tsx` — application entry and navigation container
- `navigation/AppNavigator.js` — auth and main navigation
- `navigation/MainTabNavigator.js` — tab layout and Diagnose stack
- `screens/DiagnoseScreen.js` — capture → upload → analyze flow
- `components/PlantCamera.js` — camera/gallery UI and logic
- `services/MLService.js` — prediction API client and response mapping
- `store/plantsStorage.js` — AsyncStorage helpers for saved plants
- `styles/` — UI styles

## Architecture & ML Integration Notes

- The app sends images to a remote prediction endpoint. The default client URL is `http://localhost:8000/predict` (see `services/MLService.js`).
- For Android development, the project expects ADB reverse or a reachable server (device → host) when running on a device/emulator. Adjust `MLService.apiUrl` if your backend runs elsewhere (e.g., public endpoint, ngrok URL, or AWS).
- The ML response is normalized inside `MLService.predictDiseaseRemote()` to return an object `{ Class, Confidence, raw }`, where `Confidence` is a 0–1 numeric score.

## Prerequisites

- Node.js >= 20 (project `package.json` engines)
- Yarn or npm
- Android Studio / emulator for Android development
- Xcode + CocoaPods for iOS development (macOS only)

## Setup & Run (development)

1. Install dependencies:

```bash
npm install
yarn ios
# PlantCare AI

PlantCare AI is a React Native app that helps users detect common plant diseases by uploading leaf images to a prediction API. The app shows diagnosis details, confidence, and recommended actions, and lets users save results to a local history.

Why this repo exists: it provides a mobile front-end for testing and evaluating a model-backed plant disease detector.

## Highlights

- Capture or pick a plant image using the camera/gallery UI (`components/PlantCamera.js`).
- Send images to a prediction service (`services/MLService.js`) and display results (`screens/ResultScreen.js`).
- Save diagnosed plants locally and view history (`store/plantsStorage.js`).
- Simple session handling (login/signup) using `AsyncStorage` (`navigation/AppNavigator.js`).

## Quick start

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Start the Metro bundler:

```bash
npm start
# or
yarn start
```

3. Launch on Android:

```bash
npm run android
# or
yarn android
```

4. Launch on iOS (macOS):

```bash
npm run ios
# or
yarn ios
```

## Key files

- `App.tsx` — app entry and navigation container
- `navigation/AppNavigator.js` — auth + session logic
- `navigation/MainTabNavigator.js` — tabs and Diagnose stack
- `screens/DiagnoseScreen.js` — capture and analyze flow
- `components/PlantCamera.js` — camera/gallery UI
- `services/MLService.js` — API client and response parsing
- `store/plantsStorage.js` — saved plants helpers

## ML / Backend integration

- Default API URL: `http://localhost:8000/predict` (see `services/MLService.js`).
- The client uploads the image under the form field named `file` and includes `device_id` (see `services/DeviceIdService.js`).
- Accepted response patterns include fields like `prediction` / `Prediction` / `class` and `confidence` / `Confidence`. `MLService` normalizes the confidence into a 0–1 float.

Example FastAPI endpoint the app expects:

```python
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse

app = FastAPI()

@app.post('/predict')
async def predict(file: UploadFile = File(...), device_id: str = Form(None)):
		contents = await file.read()
		# decode contents and run the model here
		return JSONResponse({'prediction': 'Rust Sugarcane Leaf', 'confidence': '85.28%'})
```

Tips:

- For Android device testing against a local server, run:

```bash
adb reverse tcp:8000 tcp:8000
```

- For a public test URL, expose the server with `ngrok` and set `services/MLService.js` `apiUrl` to the forwarded URL.

## Notes for developers

- Auth in `navigation/AppNavigator.js` is a simple local simulation for demo purposes; replace it with real auth when needed.
- Saved plants are kept under key `plants_history_v1` in `AsyncStorage`.
- `services/MLService.js` contains robust logging for easier debugging of API errors.

## Commands

- `npm start` — start Metro
- `npm run android` — build + run Android
- `npm run ios` — build + run iOS (macOS)
- `npm test` — run tests

## License

Add a `LICENSE` file if you intend to open-source this project.

---

If you want further polish I can add screenshots, a small backend README, or a short troubleshooting section for common setup issues.
		```bash
		adb reverse tcp:8000 tcp:8000
		```

		Then keep `MLService.apiUrl` as `http://localhost:8000/predict`.

- Q: I want to use an externally reachable URL (ngrok / public). How to configure?
	- A: Start `ngrok http 8000`, copy the HTTPS forwarding URL (e.g. `https://abcd1234.ngrok.io`) and update `services/MLService.js` `this.apiUrl` to `${NGROK_URL}/predict` or set a small config constant.

- Q: What authentication does the API need?
	- A: The current app does not attach auth headers for model calls. Add token / API key handling in `services/MLService.js` if your endpoint requires it. Example: add `Authorization: Bearer <TOKEN>` to axios headers.

## Backend README snippet (optional file)

If you want, I can create a `backend/README.md` that includes a small PyTorch inference example, Dockerfile, and a simple FastAPI server template. Should I add that file now?
