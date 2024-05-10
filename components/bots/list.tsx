'use client';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';

import { Bot } from '#/lib/db/schema';

import BotCard from './card';

function BotList({ bots }: { bots: Bot[] }) {
  return (
    <div className="space-y-4">
      <AnimatePresence>
        {bots.map((bot, index) => (
          <motion.div
            key={bot.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{
              delay: (index + 1) * 0.05,
              duration: 0.23,
              ease: 'easeInOut',
              stiffness: 500,
              damping: 50,
              type: 'spring',
            }}
          >
            <BotCard
              id={bot.id}
              name={bot.name}
              picture={bot.picture || ''}
              onDelete={() => {}}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default BotList;
