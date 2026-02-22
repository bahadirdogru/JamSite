/**
 * Phosphor Icons SVG Sprite Generator
 * 
 * Bu script, @phosphor-icons/core paketinden belirtilen ikonları alıp
 * tek bir SVG sprite dosyası oluşturur.
 * 
 * Kullanım: node scripts/generate-sprite.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Kullanılacak ikonlar ve ağırlıkları
// Format: { name: "icon-id", icon: "phosphor-icon-name", weight: "regular|bold|fill|..." }
const ICONS = [
  // Social
  { name: "x-logo", icon: "x-logo", weight: "regular" },
  { name: "linkedin", icon: "linkedin-logo", weight: "regular" },
  { name: "whatsapp", icon: "whatsapp-logo", weight: "regular" },
  { name: "link", icon: "link", weight: "regular" },
  
  // Navigation
  { name: "arrow-right", icon: "arrow-right", weight: "regular" },
  { name: "arrow-left", icon: "arrow-left", weight: "regular" },
  { name: "arrow-up", icon: "arrow-up", weight: "regular" },
  { name: "caret-down", icon: "caret-down", weight: "regular" },
  
  // Actions
  { name: "copy", icon: "copy", weight: "regular" },
  { name: "trash", icon: "trash", weight: "regular" },
  { name: "share", icon: "share-network", weight: "regular" },
  { name: "eye", icon: "eye", weight: "regular" },
  
  // Status
  { name: "check-circle", icon: "check-circle", weight: "regular" },
  { name: "x-circle", icon: "x-circle", weight: "regular" },
  { name: "info", icon: "info", weight: "regular" },
  { name: "warning", icon: "warning", weight: "regular" },
  
  // UI
  { name: "heart", icon: "heart", weight: "regular" },
  { name: "heart-fill", icon: "heart-fill", weight: "fill" },
  { name: "bookmark", icon: "bookmark-simple", weight: "regular" },
  { name: "bookmark-fill", icon: "bookmark-simple-fill", weight: "fill" },
  { name: "sun", icon: "sun", weight: "regular" },
  { name: "moon", icon: "moon", weight: "regular" },
  { name: "magnifying-glass", icon: "magnifying-glass", weight: "regular" },
  { name: "x", icon: "x", weight: "regular" },
  { name: "list", icon: "list", weight: "regular" },
  { name: "funnel", icon: "funnel", weight: "regular" },
  { name: "scales", icon: "scales", weight: "regular" },
  { name: "keyboard", icon: "keyboard", weight: "regular" },
  { name: "spinner", icon: "spinner", weight: "regular" },
  
  // Content
  { name: "cube", icon: "cube", weight: "regular" },
  { name: "newspaper", icon: "newspaper", weight: "regular" },
  { name: "image", icon: "image", weight: "regular" },
];

const CORE_PATH = path.join(__dirname, "..", "node_modules", "@phosphor-icons", "core", "assets");
const OUTPUT_PATH = path.join(__dirname, "..", "assets", "icons", "sprite.svg");

function extractPathFromSvg(svgContent) {
  // SVG içinden path elementlerini çıkar
  const pathMatches = svgContent.match(/<path[^>]*\/>/g);
  if (!pathMatches) return "";
  return pathMatches.join("\n    ");
}

function generateSprite() {
  const symbols = [];
  let missing = [];

  for (const icon of ICONS) {
    const svgPath = path.join(CORE_PATH, icon.weight, `${icon.icon}.svg`);
    
    if (!fs.existsSync(svgPath)) {
      missing.push(`${icon.icon} (${icon.weight})`);
      continue;
    }

    const svgContent = fs.readFileSync(svgPath, "utf8");
    const paths = extractPathFromSvg(svgContent);
    
    symbols.push(`  <symbol id="icon-${icon.name}" viewBox="0 0 256 256">
    ${paths}
  </symbol>`);
  }

  if (missing.length > 0) {
    console.warn("Warning: Missing icons:", missing.join(", "));
  }

  const sprite = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
${symbols.join("\n")}
</svg>
`;

  // Output klasörünü oluştur
  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, sprite);
  console.log(`Generated sprite with ${symbols.length} icons at ${OUTPUT_PATH}`);
}

generateSprite();
