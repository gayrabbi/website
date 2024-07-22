const fs = require('fs');
const path = require('path');

function generateStructure(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    return items.map(item => {
        const itemPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            return {
                type: 'directory',
                name: item.name,
                children: generateStructure(itemPath)
            };
        } else if (path.extname(item.name).toLowerCase() === '.html') {
            return {
                type: 'file',
                name: path.basename(item.name, '.html'),
                path: 'pages/' + path.relative('pages', itemPath).replace(/\\/g, '/')
            };
        }
    }).filter(Boolean);
}

const structure = generateStructure('pages');
fs.writeFileSync('directory-structure.json', JSON.stringify(structure, null, 2));
console.log('directory-structure.json has been updated.');