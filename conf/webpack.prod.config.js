const path = require("path");
module.exports = {
    entry: "./src/ValidateFormMixins.js",
    output: {
        filename: "validate-form.js",
        path: path.resolve(__dirname, "../dist"),
        library: '_svfMixins',
        libraryTarget: 'var',
        libraryExport: "default",
        auxiliaryComment: "这是一个表单校验插件，主要配合vue一起使用，提供了通用的校验逻辑，github是https://github.com/liu75675231/form-validate， 作者liuht",
    }
}
