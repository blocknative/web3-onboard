import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: { preset: "" }, // your deployment
  vite: { plugins: [tailwindcss()] }
});
