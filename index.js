const fs = require('fs')
const path = require('path')

module.exports = function (content) {
    this.cacheable();
    const globalPath = path.join(process.cwd(), 'global.css');
    const relativePath = path.relative(path.dirname(this.resourcePath), globalPath);
    console.log('relativePath', relativePath);
    if (fs.existsSync(globalPath))
        content = `@import '${relativePath}';\n` + content;
    return content;
}
