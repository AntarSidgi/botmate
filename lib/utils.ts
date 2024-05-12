import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { env } from './env';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDataDir(folder?: string) {
  return env.isDev
    ? `${process.cwd()}/data${folder ? `/${folder}` : ''}`
    : `${__dirname}/data${folder ? `/${folder}` : ''}`;
}
