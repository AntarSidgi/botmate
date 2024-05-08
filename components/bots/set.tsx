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
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return <>{children}</>;
}

export default SetBots;
