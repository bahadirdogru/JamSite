import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  site: "https://jamsite.example.com",
  image: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
  i18n: {
    defaultLocale: "tr",
    locales: ["tr", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
  integrations: [svelte(), sitemap()],
  vite: {
    plugins: [
      tailwindcss(),
      VitePWA({
        registerType: "prompt",
        manifest: false,
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
          navigateFallback: "/offline/",
          navigateFallbackDenylist: [/^\/api\//, /\.(json|xml|txt)$/],
          runtimeCaching: [
            { urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i, handler: "CacheFirst", options: { cacheName: "images", expiration: { maxEntries: 50 } } },
          ],
        },
      }),
    ],
  },
});
