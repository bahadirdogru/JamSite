export const site = {
  title: "JamSite",
  description: "Modern Astro + Svelte 5 hybrid static site",
  url: "",
  baseUrl: "",
};

export const languages = ["tr", "en"];
export const defaultLang = "tr";

export function isDefaultLang(lang) {
  return lang === defaultLang;
}

export function getLangPrefix(lang) {
  return isDefaultLang(lang) ? "" : `/${lang}`;
}

export function getCanonicalUrl(path, lang) {
  const base = site.url || site.baseUrl || "";
  const prefix = getLangPrefix(lang);
  return `${base}${prefix}${path}`.replace(/\/+/g, "/");
}
