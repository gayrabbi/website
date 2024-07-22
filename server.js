const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.static('public'));
app.use(express.static('pages'));

function getDirectoryStructure(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    return items.map(item => {
        const itemPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            return {
                type: 'directory',
                name: item.name,
                children: getDirectoryStructure(itemPath)
            };
        } else {
            return {
                type: 'file',
                name: item.name,
                path: '/' + path.relative('pages', itemPath).replace(/\\/g, '/')
            };
        }
    });
}

app.get('/directory-structure', (req, res) => {
    try {
        console.log('Attempting to get directory structure...');
        const structure = getDirectoryStructure('./pages');
        console.log('Directory structure:', JSON.stringify(structure, null, 2));
        res.json(structure);
    } catch (error) {
        console.error('Error getting directory structure:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));