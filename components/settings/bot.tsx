'use client';

import { toast } from 'sonner';

import {
  useEffect,
  useRef,
  useState,
} from 'react';

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
import { Switch } from '../ui/switch';

function BotSettings() {
  const { currentBot, updateCurrentBot } =
    useStore();

  const updateBotToken =
    trpc.updateBotToken.useMutation();

  const setWebhook =
    trpc.setWebhook.useMutation();
  const disableWebhook =
    trpc.disableWebhook.useMutation();

  const newTokenRef =
    useRef<HTMLInputElement>(null);
  const webhookRef =
    useRef<HTMLInputElement>(null);

  const [enableWebhook, setEnableWebhook] =
    useState(Boolean(currentBot?.enableWebhook));

  const botId = currentBot?.id!;

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

  function handleWebhook() {
    if (!enableWebhook) {
      // Enable webhook
      disableWebhook
        .mutateAsync(botId)
        .then(() => {
          toast.success(
            'Webhook disabled successfully',
          );
          updateCurrentBot({
            enableWebhook: false,
            webhookUrl: null,
          });
        })
        .catch((err) => {
          if (err instanceof TRPCClientError) {
            toast.error(err.message);
          }
        });
      return;
    }

    // Enable webhook
    const url = webhookRef.current?.value;
    if (!url) {
      toast.error('Please enter a webhook URL');
      return;
    }
    setWebhook
      .mutateAsync({
        botId,
        url,
      })
      .then(() => {
        toast.success(
          'Webhook configured successfully',
        );
        updateCurrentBot({
          enableWebhook: true,
          webhookUrl: url,
        });
      })
      .catch((err) => {
        if (err instanceof TRPCClientError) {
          toast.error(err.message);
        }
      });
  }

  useEffect(() => {
    setEnableWebhook(
      Boolean(currentBot?.enableWebhook),
    );
  }, [currentBot]);

  return (
    <div className="container space-y-4 py-4">
      {/* Token Update */}
      <Card>
        <CardHeader>
          <CardTitle className="text-md">
            Token
          </CardTitle>
          <CardDescription>
            Update your bot token with a new one
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
            Submit
          </Button>
        </CardFooter>
      </Card>

      {/* Webhook */}
      <Card>
        <CardHeader className="relative">
          <CardTitle className="text-md">
            Webhook
          </CardTitle>
          <CardDescription>
            Configure webhook settings for your
            bot
          </CardDescription>
          <Switch
            className="absolute right-6 top-6"
            checked={enableWebhook}
            onCheckedChange={() => {
              setEnableWebhook((prev) => !prev);
              if (enableWebhook) {
                disableWebhook.mutateAsync(botId);
              }
            }}
          />
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Enter webhook API endpoint"
            ref={webhookRef}
            disabled={!enableWebhook}
            defaultValue={
              currentBot?.webhookUrl ?? ''
            }
          />
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleWebhook}
            disabled={
              !enableWebhook ||
              setWebhook.isLoading
            }
            isLoading={setWebhook.isLoading}
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default BotSettings;
