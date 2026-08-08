const fs = require('fs');
const path = require('path');

const colorMap = {
  // Purples -> Pinks
  '#8b5fc0': '#d892a0',
  '#6d3ba0': '#bd6f80',
  '#9b86bd': '#ccaab1',
  '#a596c0': '#d1b6bc',
  '#d9c9ee': '#eed3d9',
  '#fbf8fe': '#fffafb',
  '#f3ecfb': '#fdf6f7',
  '109,59,160': '189,111,128',
  '124,79,176': '207,140,154',
  '88,54,140': '114,80,88',
  '56,38,80': '82,60,68',
  '45,20,55': '71,50,56',
  
  // Greens (in rgba) -> Pinks
  '114,137,118': '207,140,154'
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
