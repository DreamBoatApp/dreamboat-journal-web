const { execSync } = require('child_process');
try {
    const output = execSync('npx next build', {
        cwd: __dirname,
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe'],
        maxBuffer: 50 * 1024 * 1024,
        timeout: 300000,
    });
    console.log(output);
} catch (e) {
    console.log('=== STDOUT ===');
    console.log(e.stdout);
    console.log('=== STDERR ===');
    console.log(e.stderr);
}
