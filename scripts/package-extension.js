/**
 * Builds a Chrome Web Store ZIP from dist/ (manifest at zip root).
 * Excludes previous zips and OS junk.
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const releases = path.join(root, 'releases');
const manifestPath = path.join(dist, 'manifest.json');

if (!fs.existsSync(manifestPath)) {
  console.error('dist/manifest.json not found. Run a build first.');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const version = manifest.version;
const zipName = `DataNinja-${version}.zip`;
const zipPath = path.join(releases, zipName);

fs.mkdirSync(releases, { recursive: true });
if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

// Remove stale package inside dist so it is never bundled again
const staleDistZip = path.join(dist, 'DataNinja.zip');
if (fs.existsSync(staleDistZip)) {
  fs.unlinkSync(staleDistZip);
}

execFileSync(
  'zip',
  [
    '-r',
    zipPath,
    '.',
    '-x',
    '*.zip',
    '-x',
    '*.DS_Store',
    '-x',
    '*/.DS_Store',
  ],
  { cwd: dist, stdio: 'inherit' }
);

const sizeKb = Math.round(fs.statSync(zipPath).size / 1024);
console.log(`\nChrome Web Store package ready:`);
console.log(`  ${zipPath}`);
console.log(`  version ${version} · ${sizeKb} KB`);
console.log(`\nUpload this ZIP at https://chrome.google.com/webstore/devconsole`);
