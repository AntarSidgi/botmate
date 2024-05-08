import { Bot } from 'grammy';
import { Message } from 'grammy/types';
import { create } from 'zustand';

type Debug = {
  status:
    | 'offline'
    | 'online'
    | 'starting'
    | 'stopping';
  instance: Bot | null;
  createInstance: (token: string) => void;
  deleteInstance: () => void;

  messages: Message[];
  insertMessage: (message: Message) => void;
};

export const useDebug = create<Debug>(
  (set, get) => ({
    messages: [],
    insertMessage(message) {
      set((state) => {
        return {
          messages: [message, ...state.messages],
        };
      });
    },

    status: 'offline',
    instance: null,

    createInstance(token) {
      set({ status: 'starting' });
      const bot = new Bot(token);

      set((state) => {
        if (state.status === 'online') {
          return { instance: bot };
        }
        bot.init().then(() => {
          set({ status: 'online' });
          bot.start();
        });
        return {
          instance: bot,
        };
      });
    },

    async deleteInstance() {
      set({ status: 'stopping' });
      const { instance } = get();
      if (instance) {
        await instance.stop();
        set({
          instance: null,
          status: 'offline',
        });
      }
    },
  }),
);
