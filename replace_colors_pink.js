const fs = require('fs');
const path = require('path');

const colorMap = {
  '#2c362d': '#4a3036',
  '#728976': '#cf8c9a',
  '#5b6b60': '#8c676f',
  '#9caf9c': '#d69ea9',
  '#d8e2dc': '#ecd9dd',
  '#eef1ed': '#fcf2f4',
  '#b9c9bc': '#e6c1c8',
  '#c8d6ce': '#f0c8d0',
  '#f0f2eb': '#fdf5f6',
  '#fdfdfc': '#ffffff',
  '#e9ece5': '#faeff1',
  '#f4f6f0': '#fdf6f7'
};

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src', (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    for (const [oldColor, newColor] of Object.entries(colorMap)) {
      content = content.replace(new RegExp(oldColor, 'gi'), newColor);
    }
    if (original !== content) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${filePath}`);
    }
  }
});
