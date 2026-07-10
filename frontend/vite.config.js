import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuración de Vite para el proyecto de React
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true, // abre el navegador solo al iniciar
  },
});
