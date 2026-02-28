import { tr } from "./tr.js";
import { en } from "./en.js";

const messages = { tr, en };

export function t(lang) {
  return messages[lang] ?? tr;
}

export { tr, en };
