import { spawnSync } from 'child_process';
import { program } from 'commander';
import { copyFileSync, readFileSync } from 'fs';
import { join } from 'path';

const dir = __dirname;

const packageJSON = JSON.parse(
  readFileSync(`${dir}/package.json`, 'utf-8'),
);

program
  .version(packageJSON.version)
  .description(
    `BotMate Command Line Interface (v${packageJSON.version})`,
  );

program
  .command('start')
  .option(
    '-p, --port <port>',
    'Specify the port to run the server on',
  )
  .action((opt) => {
    spawnSync('node', ['server.js'], {
      stdio: 'inherit',
      cwd: dir,
      env: {
        ...process.env,
        PORT: opt.port || 3000,
      },
    });
  });

program
  .command('export <path>')
  .action((path) => {
    const cwd = process.cwd();
    const timestamp = new Date().getTime();
    const filename = `botmate.${timestamp}.db`;
    const exportPath = join(cwd, path, filename);
    const dbPath = join(path, 'data/db.sqlite');

    copyFileSync(dbPath, exportPath);

    console.log(
      `📦 Exported DB to ./${filename}`,
    );
  });

program.parse(process.argv);
