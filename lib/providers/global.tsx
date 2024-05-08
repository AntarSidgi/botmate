'use client';

import { Toaster } from 'sonner';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

import TrpcProvider from '../trpc/provider';

function GlobalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
  );
}

export default GlobalProvider;
