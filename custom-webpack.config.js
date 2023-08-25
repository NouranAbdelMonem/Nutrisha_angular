const webpack = require("webpack");
const { createHash } = require("crypto");
const { readFileSync } = require("fs");

let languageFileVersion;

let fileContent = readFileSync("./src/assets/i18n/en.json");
const hasher = createHash("md5");
let hash = hasher.update(fileContent, "utf-8");
languageFileVersion = hash.digest("base64url");

console.log(`languageFileVersion = ${languageFileVersion}`);

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      languageFileVersion: JSON.stringify(languageFileVersion),
    }),
  ],
};
