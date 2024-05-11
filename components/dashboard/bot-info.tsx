'use client';

import Image from 'next/image';

import { useStore } from '#/lib/store';

import { Card } from '../ui/card';

function BotInfo() {
  const { currentBot } = useStore();

  if (!currentBot) {
    return null;
  }

  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        <div>
          <Image
            alt={currentBot.name}
            src={currentBot.picture ?? ''}
            width={50}
            height={50}
            className="rounded-xl"
          />
        </div>
        <div>
          <h1 className="text-lg font-bold">
            {currentBot.name}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {currentBot.id}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default BotInfo;
