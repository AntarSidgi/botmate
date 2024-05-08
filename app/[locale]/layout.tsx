import type { Metadata } from 'next';
import {
  NextIntlClientProvider,
  useMessages,
} from 'next-intl';
import { Poppins } from 'next/font/google';
import Script from 'next/script';

import GlobalProvider from '#/lib/providers/global';

import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'BotMate',
  description:
    'BotMate is a platform that allows you to create, manage, and monitor your Telegram bots.',
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = useMessages();
  return (
    <html lang={locale}>
      <Script
        defer
        data-domain="botmate.dev"
        src="https://analytics.monawwar.io/js/script.local.js"
      />
      <body className={`${poppins.className}`}>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <GlobalProvider>
            {children}
          </GlobalProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
