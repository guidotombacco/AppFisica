# ULUL + Core (Editable) — PWA modular con persistencia
Guarda cambios automáticamente (localStorage). Incluye export/import JSON. Lista para empaquetar con Capacitor.

## Comandos
npm install
npm run dev
npm run build

## Android (Capacitor)
npx cap init "ULUL Core" com.guido.ululcore --web-dir=dist
npx cap add android
npx cap copy
npx cap open android

## Build APK en la nube (GitHub Actions)
Crea `.github/workflows/build-apk.yml` con el workflow de la conversación para obtener `app-debug.apk` como artifact.
