'use client';

import { useEffect } from 'react';

import { Bot } from '#/lib/db/schema';
import { useStore } from '#/lib/store';

function SetBots({ bots }: { bots: Bot[] }) {
  const { setBots } = useStore();
  useEffect(() => {
    setBots(bots);
  }, [bots, setBots]);
  return null;
}

export default SetBots;
