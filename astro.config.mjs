// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
    site: 'https://cozy-server.grupogarpe.com',
    trailingSlash: 'never',
    vite: {
        plugins: [tailwindcss()],
    },
});