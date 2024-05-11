import { spawnSync } from 'child_process';
import {
  cpSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'fs';

console.log(`📦 Building Next.js Project...`);

mkdirSync('data', { recursive: true });
spawnSync('npm', ['run', 'db:push'], {
  stdio: 'inherit',
});

spawnSync('npm', ['run', 'build'], {
  stdio: 'inherit',
});

console.log(`📦 Copying files...\n`);

cpSync('.next/standalone', 'temp', {
  recursive: true,
});
cpSync('public', 'temp/public', {
  recursive: true,
});
cpSync(
  '.next/static',
  'temp/public/_next/static',
  {
    recursive: true,
  },
);

console.log(`📦 Genrating database...`);

mkdirSync('temp/data', { recursive: true });
cpSync('data/db.sqlite', 'temp/data/db.sqlite');

console.log(`\n📦 Generating package.json`);

const mainPackageJSON = JSON.parse(
  readFileSync('package.json', 'utf-8'),
);
const templatePackageJSON = JSON.parse(
  readFileSync('templates/package.json', 'utf-8'),
);

const packageJSON = {
  name: 'botmate-cli',
  dependencies: templatePackageJSON.dependencies,
  bin: {
    botmate: './bin.js',
  },
  version: mainPackageJSON.version,
  files: [
    '.next',
    'data',
    'public',
    'bin.js',
    'server.js',
  ],
};

writeFileSync(
  'temp/package.json',
  JSON.stringify(packageJSON, null, 2),
);

spawnSync(
  'pnpm',
  ['tsup', 'scripts/bin.mjs', '-d', 'temp'],
  {
    stdio: 'inherit',
  },
);

console.log(`\n📦 Publishing...`);

const binContent = readFileSync(
  'temp/bin.js',
  'utf-8',
);

const shebang = '#!/usr/bin/env node';

writeFileSync(
  'temp/bin.js',
  binContent.replace(/"use strict";/, shebang),
);

spawnSync('npm', ['publish'], {
  cwd: 'temp',
  stdio: 'inherit',
});
