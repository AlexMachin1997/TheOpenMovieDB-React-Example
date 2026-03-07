process.env.TIMING = '1';
require('child_process').execSync('node ../../node_modules/eslint/bin/eslint.js . --no-cache', {
	stdio: 'inherit'
});
