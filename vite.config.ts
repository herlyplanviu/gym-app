import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import * as path from "path";
import { existsSync } from "fs";
import * as dotenv from "dotenv";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

dotenv.config({
  path: existsSync(".env")
    ? ".env"
    : path.resolve("envs", `.env.${process.env.NODE_ENV}`),
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@@": path.resolve(__dirname),
      "@": path.resolve(__dirname, "src"),
    },
  },
});
