const fs = require("fs");
const path = require("path");

const buildDir = path.resolve(__dirname, "../build");
const htmlPath = path.join(buildDir, "index.html");

if (!fs.existsSync(htmlPath)) {
  throw new Error(`Build output not found: ${htmlPath}`);
}

let html = fs.readFileSync(htmlPath, "utf8");
let inlinedCount = 0;

html = html.replace(
  /<link href="([^"]+\.css)" rel="stylesheet">/g,
  (link, assetPath) => {
    const relativePath = assetPath.replace(/^\/+/, "");
    const cssPath = path.resolve(buildDir, relativePath);

    if (!cssPath.startsWith(`${buildDir}${path.sep}`)) {
      throw new Error(`CSS asset is outside the build directory: ${assetPath}`);
    }
    if (!fs.existsSync(cssPath)) {
      throw new Error(`CSS asset referenced by build output is missing: ${cssPath}`);
    }

    const css = fs.readFileSync(cssPath, "utf8");
    if (/<\/style/i.test(css)) {
      throw new Error(`Cannot safely inline CSS containing a closing style tag: ${cssPath}`);
    }

    inlinedCount += 1;
    return `<style>${css}</style>`;
  },
);

if (inlinedCount === 0) {
  throw new Error("No production stylesheet links were found to inline.");
}

fs.writeFileSync(htmlPath, html);
console.log(`Inlined ${inlinedCount} production stylesheet(s) into build/index.html.`);
