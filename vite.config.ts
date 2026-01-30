import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "icon.svg"],
      manifest: {
        name: "solo-coach",
        short_name: "solo-coach",
        start_url: "/",
        display: "standalone",
        background_color: "#0f1b22",
        theme_color: "#0f1b22",
        icons: [
          {
            src: "icon.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  base: "/solo-instrument-coach/",
  server: { port: 5173 },
  test: {
    environment: "node",
    globals: true,
  },
});
