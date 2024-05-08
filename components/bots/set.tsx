'use client';

import { useEffect, useState } from 'react';

import { Bot } from '#/lib/db/schema';
import { useStore } from '#/lib/store';

import Spinner from '../ui/spinner';

function SetBots({
  bots,
  currentBot,
  children,
}: {
  bots: Bot[];
  currentBot: Bot;
  children?: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const { setBots, setCurrentBot } = useStore();
  useEffect(() => {
    setBots(bots);
    setCurrentBot(currentBot);
    setLoading(false);
  }, [bots, currentBot, setBots, setCurrentBot]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-40 flex min-h-full items-center justify-center overflow-y-auto overflow-x-hidden transition">
          <div className="fixed inset-0 z-30 h-full w-full backdrop-blur-[10px]" />
          <div className="z-40">
            <Spinner />
          </div>
        </div>
      )}
      {children}
    </>
  );
}

export default SetBots;
