import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { locales } from './config';

export default getRequestConfig(
  async ({ locale }) => {
    if (!locales.includes(locale as any))
      notFound();

    return {
      messages: (
        await import(`./locales/${locale}.json`)
      ).default,
    };
  },
);

export const localName: Record<string, string> = {
  en: 'English',
  id: 'Indonesia',
};
