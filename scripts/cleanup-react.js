const fs = require('fs');
const path = require('path');

function walk(dir, files = []) {
	if (!fs.existsSync(dir)) return files;
	fs.readdirSync(dir).forEach((file) => {
		const fullPath = path.join(dir, file);
		if (fs.statSync(fullPath).isDirectory()) {
			walk(fullPath, files);
		} else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
			files.push(fullPath);
		}
	});
	return files;
}

const packagesDir = path.join(process.cwd(), 'packages');
const uiPackages = ['ui-core', 'ui-overlays', 'ui-command', 'ui-forms'];
let allFiles = [];

for (const pkg of uiPackages) {
	const pkgSrcDir = path.join(packagesDir, pkg, 'src');
	allFiles = allFiles.concat(walk(pkgSrcDir));
}

let cleanedCount = 0;
for (const filePath of allFiles) {
	let content = fs.readFileSync(filePath, 'utf8');
	if (content.includes("import * as React from 'react';")) {
		// If the string 'React.' or '<React.' is not found, then React is not being used
		// (since we removed React.ComponentProps etc, and the import is * as React)
		if (content.split('React.').length === 1 && !content.includes('<React.')) {
			content = content.replace(/import \* as React from 'react';\r?\n?/, '');
			fs.writeFileSync(filePath, content);
			console.log('Cleaned:', filePath.replace(process.cwd(), ''));
			cleanedCount++;
		}
	}
}
console.log(`\nCleaned ${cleanedCount} files in total.`);
