'use client';

import { toast } from 'sonner';

import { useRef } from 'react';

import { useParams } from 'next/navigation';

import { TRPCClientError } from '@trpc/client';

import { useStore } from '#/lib/store';
import { trpc } from '#/lib/trpc/client';

import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';

function BotSettings() {
  const params = useParams();
  const { updateCurrentBot } = useStore();
  const updateBotToken =
    trpc.updateBotToken.useMutation();
  const newTokenRef =
    useRef<HTMLInputElement>(null);

  const botId = params.botId as string;

  function handleUpdateToken() {
    const newToken = newTokenRef.current?.value;
    if (!newToken) {
      toast.error('Please enter a new token');
      return;
    }

    updateBotToken
      .mutateAsync({
        id: botId,
        token: newToken,
      })
      .then(() => {
        toast.success(
          'Token updated successfully',
        );
        updateCurrentBot({
          token: newToken,
        });
      })
      .catch((err) => {
        if (err instanceof TRPCClientError) {
          toast.error(err.message);
        }
      });
  }

  return (
    <div className="container py-4">
      {/* Token Update */}
      <Card>
        <CardHeader>
          <CardTitle className="text-md">
            Token
          </CardTitle>
          <CardDescription>
            Update your bot token
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Enter new token"
            ref={newTokenRef}
          />
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleUpdateToken}
            isLoading={updateBotToken.isLoading}
          >
            Update
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default BotSettings;
