// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Make sure this import is present

export default defineConfig({
  plugins: [
    react(), // Add the plugin to the plugins array
  ],
});
