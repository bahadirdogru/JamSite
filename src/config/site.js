/**
 * Tekil site yapılandırması (Jekyll _config.yml benzeri).
 * Site kimliği, özellik aç/kapa ve i18n tek bu dosyadan yönetilir.
 * Astro config, layout, feed, arama ve sayfa üretimi buradan okur.
 */

// --- Site kimliği ---
export const site = {
  title: "JamSite",
  description: "Modern Astro + Svelte 5 hybrid static site",
  /** Production URL (sitemap, canonical, RSS için). Boş bırakılırsa astro.config'teki site kullanılır. */
  url: "https://jamsite.example.com",
  /** Alt dizin (örn. GitHub Pages: "/JamSite"). Genelde "". */
  baseUrl: "",
};

// --- Özellik bayrakları (aç/kapa) ---
export const features = {
  blog: true,
  products: true,
  search: true,
  pwa: true,
  rss: true,
  darkMode: true,
  sitemap: true,
  tags: true,
  categories: true,
  /** Özellikler sayfası (/features) */
  features: true,
  /** Başlangıç rehberi (/getting-started) */
  gettingStarted: true,
  /** UI blokları showcase sayfası (/ui-bloklari, /en/ui-bloklari) */
  uiBlocks: true,
};

// --- i18n (tek kaynak: yeni dil için sadece languages'a ekle) ---
export const languages = ["tr", "en"];
export const defaultLang = "tr";

export const localeForOg = {
  tr: "tr_TR",
  en: "en_US",
  de: "de_DE",
};

export const languageLabels = {
  tr: "TR",
  en: "EN",
  de: "DE",
};

// --- Yardımcılar ---
export function isDefaultLang(lang) {
  return lang === defaultLang;
}

export function getLangPrefix(lang) {
  return `/${lang}`;
}

export function getOgLocale(lang) {
  return localeForOg[lang] ?? `${lang}_${lang.toUpperCase()}`;
}

export function getCanonicalUrl(path, lang) {
  const base = site.url || site.baseUrl || "";
  const prefix = getLangPrefix(lang);
  return `${base}${prefix}${path}`.replace(/\/+/g, "/");
}

/** Canonical base URL (site.url + baseUrl). Layout/feed vb. için. */
export function getSiteBase() {
  return (site.url || "").replace(/\/$/, "") + (site.baseUrl || "");
}

/**
 * [lang] route'ları için getStaticPaths: tüm diller prefix alır (prefixDefaultLocale: true).
 */
export function getStaticPathsForLang() {
  return languages.map((lang) => ({
    params: { lang },
    props: { lang },
  }));
}
