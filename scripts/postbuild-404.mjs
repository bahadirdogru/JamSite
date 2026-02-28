import fs from "fs";
import path from "path";

const dist = path.join(process.cwd(), "dist");
const src404 = path.join(dist, "404", "index.html");
const out404 = path.join(dist, "404.html");

if (fs.existsSync(src404)) {
  fs.copyFileSync(src404, out404);
  console.log("Copied 404/index.html -> 404.html for GitHub Pages");
}
