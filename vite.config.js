import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@icons": path.resolve(__dirname, "./src/icons"),
      "@assets": path.resolve(__dirname, "./public"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@constants": path.resolve(__dirname, "./constants"),
      "@context": path.resolve(__dirname, "./src/contexts"),
      "@utils": path.resolve(__dirname, "./utils"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@schema": path.resolve(__dirname, "./schema"),
      "@redux": path.resolve(__dirname, "./redux"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
    },
  },
});
