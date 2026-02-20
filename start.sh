#!/usr/bin/env bash
set -e

echo "=== JamSite Start ==="
echo ""

# Urun wrapper sayfalarini guncelle
echo "[*] Urun sayfalari olusturuluyor..."
npm run generate

# Vite bundle'i derle
echo "[*] Vite build..."
npm run build

# Jekyll serve
echo ""
echo "[*] Jekyll baslatiliyor..."
echo "    http://localhost:4000/JamSite/"
echo ""
bundle exec jekyll serve --livereload
