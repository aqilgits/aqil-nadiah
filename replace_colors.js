const fs = require('fs');
const path = require('path');

const colorMap = {
  '#382650': '#2c362d',
  '#7c4fb0': '#728976',
  '#6a5688': '#5b6b60',
  '#a87bc4': '#9caf9c',
  '#e6dcf3': '#d8e2dc',
  '#f0e8fa': '#eef1ed',
  '#c5aee0': '#b9c9bc',
  '#c9a8e8': '#c8d6ce',
  '#e5dcf0': '#f0f2eb',
  '#f7f3fb': '#fdfdfc',
  '#efe4fb': '#e9ece5',
  '#efe8f7': '#f4f6f0'
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
