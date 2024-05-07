import { create } from 'zustand';

import { Bot } from './db/schema';

type Store = {
  bots: Bot[];
  setBots: (bots: Bot[]) => void;
};

export const useStore = create<Store>((set) => ({
  bots: [],
  setBots: (bots) => set({ bots }),
}));
