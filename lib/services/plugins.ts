import fs from 'fs';
import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
import path from 'path';

import { env } from '../env';

async function install(
  botId: string,
  repo: string,
) {
  const id = Math.random()
    .toString(36)
    .substring(7);

  const dir = path.join(
    env.isDev ? process.cwd() : __dirname,
    'data',
    'plugins',
    id,
  );

  await git.clone({
    fs,
    http,
    dir,
    url: repo,
    corsProxy: 'https://cors.isomorphic-git.org',
    onProgress: (progress) => {
      console.log(progress);
    },
  });
}

export { install };
