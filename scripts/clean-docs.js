const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const outputDirectory = path.join(projectRoot, 'docs');

fs.rmSync(outputDirectory, { recursive: true, force: true });
console.log(`Cleaned ${outputDirectory}`);
