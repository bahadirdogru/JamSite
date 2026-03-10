import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import { site, features, languages, defaultLang } from "./src/config/site.js";

export default defineConfig({
  site: site.url || "https://jamsite.example.com",
  image: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
  i18n: {
    defaultLocale: defaultLang,
    locales: languages,
    routing: {
      prefixDefaultLocale: true,
    },
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
  integrations: [
    svelte(),
    ...(features.sitemap ? [sitemap()] : []),
  ],
  vite: {
    plugins: [
      tailwindcss(),
      ...(features.pwa
        ? [
            VitePWA({
              registerType: "prompt",
              manifest: false,
              workbox: {
                globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
                navigateFallback: "/tr/offline/",
                navigateFallbackDenylist: [/^\/api\//, /\.(json|xml|txt)$/],
                runtimeCaching: [
                  {
                    urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
                    handler: "CacheFirst",
                    options: {
                      cacheName: "images",
                      expiration: { maxEntries: 50 },
                    },
                  },
                ],
              },
            }),
          ]
        : []),
    ],
  },
});
