import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { URL, fileURLToPath } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "~": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://m1.apifoxmock.com/m1/7460802-7195274-default",
        changeOrigin: true,
      },
    },
  },
});
