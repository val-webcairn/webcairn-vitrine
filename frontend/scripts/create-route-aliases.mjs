import { mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve('dist');
const sourceIndex = path.join(distDir, 'index.html');

const spaRoutes = [
  path.join(distDir, 'tarifs', 'index.html'),
];

const main = async () => {
  for (const routeIndex of spaRoutes) {
    await mkdir(path.dirname(routeIndex), { recursive: true });
    await copyFile(sourceIndex, routeIndex);
  }
  process.stdout.write('SPA route aliases generated.\n');
};

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exit(1);
});
