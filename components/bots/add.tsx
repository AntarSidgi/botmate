'use client';

import { toast } from 'sonner';

import { useRef } from 'react';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { TRPCClientError } from '@trpc/client';

import { Button } from '#/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card';
import { Input } from '#/components/ui/input';

import { trpc } from '#/lib/trpc/client';

function CreateBotCard() {
  const r = useRouter();
  const t = useTranslations();
  const addBot = trpc.addBot.useMutation();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit() {
    const token = inputRef.current?.value;
    if (!token) {
      toast.error(t('Create Bot.Error.Empty'));
      return;
    }

    addBot
      .mutateAsync({
        token,
      })
      .then((res) => {
        if (res) r.push(`/bots/${res.id}`);
      })
      .catch((err) => {
        if (err instanceof TRPCClientError) {
          toast.error(err.message);
        }
      });
  }

  return (
    <>
      <Card className="w-[25rem]">
        <CardHeader>
          <CardTitle>
            {t('Create Bot.Title')}
          </CardTitle>
          <CardDescription>
            {t('Create Bot.Description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            ref={inputRef}
            placeholder={t(
              'Create Bot.Placeholder',
            )}
          />
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSubmit}
            isLoading={addBot.isLoading}
          >
            {t('Common.Submit')}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default CreateBotCard;
