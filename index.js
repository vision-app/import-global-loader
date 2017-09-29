const fs = require('fs');
const path = require('path');

module.exports = function (content) {
    this.cacheable();
    //兼容vusion打包单个组件时引入指定路径的global.css
    const configPath = global.vusionConfig && global.vusionConfig.globalCssPath
    const globalPath = configPath ? configPath : path.join(process.cwd(), 'global.css');
    let relativePath = path.relative(path.dirname(this.resourcePath), globalPath);
    if (!relativePath.includes('/'))
        relativePath = './' + relativePath;
    this.addDependency(globalPath);
    if (fs.existsSync(globalPath))
        content = `@import '${relativePath}';\n` + content;
    return content;
};
