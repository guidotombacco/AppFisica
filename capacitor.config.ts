// capacitor.config.ts
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.guido.rutina',   // ← tu ID único de app (formato dominio inverso)
  appName: 'Rutina Ejercicio', // ← nombre visible
  webDir: 'dist',              // Vite compila a dist
  bundledWebRuntime: false
};

export default config;