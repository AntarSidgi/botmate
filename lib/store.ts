import { create } from 'zustand';

import { Bot } from './db/schema';

type Store = {
  bots: Bot[];
  setBots: (bots: Bot[]) => void;
  currentBot: Bot | null;
  setCurrentBot: (bot: Bot) => void;
  updateCurrentBot: (bot: Partial<Bot>) => void;
};

export const useStore = create<Store>((set) => ({
  bots: [],
  setBots: (bots) => set({ bots }),
  currentBot: null,
  setCurrentBot: (currentBot) =>
    set({ currentBot }),
  updateCurrentBot(bot) {
    set((state) => ({
      currentBot: {
        ...state.currentBot!,
        ...bot,
      },
    }));
  },
}));
