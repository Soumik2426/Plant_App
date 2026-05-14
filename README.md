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
# or
yarn install
```

2. Start Metro bundler:

```bash
npm start
# or
yarn start
```

3. Run on Android emulator/device:

```bash
npm run android
# or
yarn android
```

4. Run on iOS (macOS):

```bash
npm run ios
# or
yarn ios
```

Backend (ML API)

- The app uploads images as multipart/form-data to the configured `apiUrl` (see `services/MLService.js`). If you run the model server locally and test on an Android device/emulator, use `adb reverse tcp:8000 tcp:8000` to make `http://localhost:8000` reachable from the device.
- Expected response shape (examples handled by `MLService`):
	- `{ prediction: 'Rust Sugarcane Leaf', confidence: '85.28%', image_url: '...' }`
	- The service will extract class and confidence and normalize confidence to a 0–1 float.

## Development Notes

- Simulated auth is implemented in `navigation/AppNavigator.js` and persisted to `AsyncStorage` for demo purposes — replace with a real auth API as needed.
- Saved plants are stored locally via `store/plantsStorage.js` using key `plants_history_v1`.
- Error handling in `services/MLService.js` prints diagnostic logs and throws readable errors surfaced to the UI.

## Contributing

- Fork the repo, create a branch, and open a PR. Keep changes focused and include tests where applicable.

## Useful Commands

- `npm start` — start Metro
- `npm run android` — build + run Android
- `npm run ios` — build + run iOS (macOS)
- `npm test` — run Jest tests

## License

This repository does not include a license file. Add one if you plan to open-source the project.

---

If you'd like, I can also:

1. Add a FAQ section describing how to point the app to a remote ML endpoint (ngrok / public URL).
2. Add a small `backend/` README snippet describing the expected FastAPI/PyTorch payload and response format.

README updated to reflect the app's real structure and ML integration.

## Backend / ML Integration (example)

This app expects a prediction service that accepts a multipart/form-data POST with an image and optional device identifier. Here's a minimal FastAPI example showing the expected contract and a small hint on how to run a model inference handler.

Example endpoint (FastAPI):

```python
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse

app = FastAPI()

@app.post('/predict')
async def predict(file: UploadFile = File(...), device_id: str = Form(None)):
		# read bytes
		contents = await file.read()
		# TODO: decode image bytes and run model inference (e.g., PIL.Image.open + torchvision transform)
		# Example response format that the app handles:
		result = {
				'prediction': 'Rust Sugarcane Leaf',
				'confidence': '85.28%',
				'image_url': None
		}
		return JSONResponse(content=result)
```

Notes:
- Field names: the app uploads the image under `file` and includes `device_id` as a form field.
- Response shapes handled by `services/MLService.js`: `prediction` / `Prediction` / `class` / `Class` and `confidence` / `Confidence` (string like `85.28%` or numeric). The client normalizes confidence to a 0–1 float.
- If your model returns numeric confidence in 0–1 range, the client already handles that. If returning 0–100, it converts accordingly.

Performance & deployment hints:
- For local development use `adb reverse tcp:8000 tcp:8000` (Android) so `http://localhost:8000` on the device maps to your host.
- For quick remote testing, expose the backend with `ngrok http 8000` and set `services/MLService.js` `apiUrl` to the ngrok URL.
- For production, host the model with a scalable API (AWS/GCP/Azure) and use HTTPS.

## FAQ — Pointing the app to your ML endpoint

- Q: I run the server locally on port 8000 — the app on my device can't reach it. What do I do?
	- A: If testing on an Android device/emulator, run:

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
