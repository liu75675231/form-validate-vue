const path = require("path");
module.exports = {
    entry: "./src/ValidateFormMixins.js",
    output: {
        filename: "output.js",
        path: path.resolve(__dirname, "../dist"),
        library: '_svfMixins',
        libraryTarget: 'var',
        libraryExport: "default",
    }
}
