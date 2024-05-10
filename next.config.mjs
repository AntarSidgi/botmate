import { execSync } from 'child_process';
import { readFileSync } from 'fs';

import createNextIntlPlugin from 'next-intl/plugin';

const packageJSON = JSON.parse(
  readFileSync('./package.json', {
    encoding: 'utf-8',
  }),
);

const withNextIntl = createNextIntlPlugin();

function getSha() {
  try {
    return execSync('git rev-parse HEAD')
      .toString()
      .trim();
  } catch (error) {
    return 'unknown';
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  env: {
    version: packageJSON.version,
    gitSHA: process.env.GIT_SHA || getSha(),
  },
  experimental: {
    instrumentationHook: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
