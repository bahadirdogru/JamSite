#!/usr/bin/env bash
set -e

echo "=== JamSite Install ==="
echo ""

# --- Node.js ---
if ! command -v node &> /dev/null; then
  echo "[ERROR] Node.js bulunamadi. https://nodejs.org adresinden yukleyin."
  exit 1
fi
echo "[OK] Node.js $(node -v)"

# --- Ruby ---
if ! command -v ruby &> /dev/null; then
  echo "[ERROR] Ruby bulunamadi."
  echo "  Windows: https://rubyinstaller.org (Ruby+Devkit)"
  echo "  macOS:   brew install ruby"
  echo "  Linux:   sudo apt install ruby-full build-essential"
  exit 1
fi
echo "[OK] Ruby $(ruby -v | cut -d' ' -f2)"

# --- Bundler ---
if ! command -v bundle &> /dev/null; then
  echo "[*] Bundler kuruluyor..."
  gem install bundler
fi
echo "[OK] Bundler $(bundle -v | cut -d' ' -f3)"

# --- Ruby gems (Jekyll + github-pages) ---
echo ""
echo "[*] Ruby gems kuruluyor (github-pages + Jekyll)..."
bundle install

# --- Node packages ---
echo ""
echo "[*] Node paketleri kuruluyor..."
npm install

# --- Product wrapper pages ---
echo ""
echo "[*] Urun sayfalari olusturuluyor..."
npm run generate

# --- Vite build ---
echo ""
echo "[*] Vite build (Svelte + Tailwind)..."
npm run build

echo ""
echo "=== Kurulum tamamlandi ==="
echo ""
echo "Siteyi baslatmak icin:  ./start.sh"
echo "Sadece Svelte dev:      npm run dev"
