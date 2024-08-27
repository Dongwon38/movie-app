import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/movie-pin/",
  // build: {
  //   outDir: "movie-pin",
  // },
  plugins: [react()],
});
