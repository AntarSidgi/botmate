'use client';

import { Toaster } from 'sonner';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import TrpcProvider from '../trpc/provider';

function GlobalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider
      defaultTheme="dark"
      attribute="class"
    >
      <TrpcProvider>
        <Toaster />
        <ProgressBar
          height="4px"
          color="#5C6FEE"
          options={{ showSpinner: false }}
          shallowRouting
        />
        {children}
      </TrpcProvider>
    </NextThemesProvider>
  );
}

export default GlobalProvider;
