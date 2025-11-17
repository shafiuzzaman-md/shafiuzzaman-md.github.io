import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// For a user/organization page (repo: shafiuzzaman-md.github.io), use base: "/".
export default defineConfig({
  plugins: [react()],
  base: "/",
});