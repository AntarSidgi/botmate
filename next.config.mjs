import { execSync } from 'child_process';
import { readFileSync } from 'fs';

import createNextIntlPlugin from 'next-intl/plugin';

const packageJSON = JSON.parse(
  readFileSync('./package.json', {
    encoding: 'utf-8',
  }),
);

const withNextIntl = createNextIntlPlugin();

const revision = execSync(
  'git rev-parse --short HEAD',
)
  .toString()
  .trim();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    version: packageJSON.version,
    gitLastCommit: revision,
  },
};

export default withNextIntl(nextConfig);
