import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
      "@/components": new URL("./src/components", import.meta.url).pathname,
      "@/pages": new URL("./src/pages", import.meta.url).pathname,
      "@/services": new URL("./src/services", import.meta.url).pathname,
      "@/utils": new URL("./src/utils", import.meta.url).pathname,
      "@/layouts": new URL("./src/layouts", import.meta.url).pathname,
      "@/api": new URL("./src/api", import.meta.url).pathname,
      "@/schemas": new URL("./src/schemas", import.meta.url).pathname,
      "@/hooks": new URL("./src/hooks", import.meta.url).pathname,
    },
  },
});
