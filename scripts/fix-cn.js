const fs = require('fs');
const path = require('path');

function walk(dir, files = []) {
	if (!fs.existsSync(dir)) return files;
	fs.readdirSync(dir).forEach((file) => {
		const fullPath = path.join(dir, file);
		if (fs.statSync(fullPath).isDirectory()) {
			walk(fullPath, files);
		} else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
			let content = fs.readFileSync(fullPath, 'utf8');
			const searchStr = "import { cn } from '@repo/ui-core';";
			if (content.includes(searchStr)) {
				content = content.replace(searchStr, "import { cn } from '~/utils/cn';");
				fs.writeFileSync(fullPath, content);
				console.log('Fixed cn import:', fullPath.replace(process.cwd(), ''));
			}
		}
	});
}
walk(path.join(process.cwd(), 'packages', 'ui-core', 'src', 'components'));
