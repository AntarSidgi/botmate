import React from 'react';

import Image from 'next/image';

import HomeMenu from './menu';

type Props = {
  children: React.ReactNode;
};
function HomeLayout({ children }: Props) {
  return (
    <div className="flex h-screen items-center">
      <div className="container h-[80%] max-w-[40rem] space-y-6">
        <div className="flex items-center justify-center gap-2">
          <Image
            alt="botmate logo"
            src="/logo.png"
            width={100}
            height={100}
            className="h-12 w-12 rounded-xl shadow-lg"
          />
          <h1 className="text-center text-4xl font-bold">
            <span className="text-primary">
              bot
            </span>
            mate
          </h1>
        </div>

        <div className="space-y-2">
          <HomeMenu />

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default HomeLayout;
