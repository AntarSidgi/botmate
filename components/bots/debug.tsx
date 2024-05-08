'use client';

import { Message } from 'grammy/types';

import { useEffect, useState } from 'react';
import JSONView from 'react-json-view';

import { useDebug } from '#/lib/debug';

import DebugActions from '../actions/debug';

function DebugBot() {
  const [selectedMessage, setSelectedMessage] =
    useState<Message | null>(null);
  const { instance, messages, insertMessage } =
    useDebug();

  useEffect(() => {
    instance?.on(':text', (ctx) => {
      insertMessage(ctx.message as Message);
    });
  }, [insertMessage, instance]);

  return (
    <>
      <div className="flex h-full w-full overflow-hidden">
        <div className="h-full w-72 border-r bg-background">
          <div className="h-full">
            <div className="flex h-16 items-center justify-between border-b p-4">
              <h5 className="text-sm uppercase text-muted-foreground">
                Live Messages
              </h5>
              <DebugActions />
            </div>

            <div className="h-full space-y-2 overflow-y-scroll">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className="border-b p-4"
                  onClick={() =>
                    setSelectedMessage(message)
                  }
                >
                  <p>{message.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {selectedMessage ? (
          <div className="flex-1 bg-background p-4">
            <JSONView src={selectedMessage} />
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            No message selected
          </div>
        )}
      </div>
    </>
  );
}

export default DebugBot;
