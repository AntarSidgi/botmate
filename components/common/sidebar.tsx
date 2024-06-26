'use client';

import { motion } from 'framer-motion';
import {
  BoxIcon,
  BugIcon,
  LayoutDashboard,
  PlusIcon,
  SettingsIcon,
  ShoppingCartIcon,
} from 'lucide-react';
import { toast } from 'sonner';

import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import {
  useParams,
  usePathname,
  useRouter,
} from 'next/navigation';

import { TRPCClientError } from '@trpc/client';

import { useStore } from '#/lib/store';
import { trpc } from '#/lib/trpc/client';

import { Button } from '../ui/button';
import {
  Card,
  CardDescription,
  CardTitle,
} from '../ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

function Sidebar() {
  const r = useRouter();
  const t = useTranslations();
  const params = useParams();
  const pathname = usePathname();
  const { bots, currentBot } = useStore();

  const startBot = trpc.startBot.useMutation();
  const stopBot = trpc.stopBot.useMutation();
  const restartBot =
    trpc.restartBot.useMutation();

  const [status, setStatus] = useState(0);

  const activeBot = bots.find(
    (bot) => bot.id === params.botId,
  );

  useEffect(() => {
    if (currentBot) {
      setStatus(currentBot.status);
    }
  }, [currentBot]);

  const options = useMemo(
    () => [
      {
        title: t('Sidebar.Dashboard'),
        href: '/bots/[botId]',
        icon: LayoutDashboard,
      },
      {
        title: t('Sidebar.Handlers'),
        href: '/bots/[botId]/handlers',
        icon: BoxIcon,
        nested: true,
      },
      {
        title: t('Sidebar.Debug'),
        href: '/bots/[botId]/debug',
        icon: BugIcon,
      },
      {
        title: t('Sidebar.Marketplace'),
        href: '/bots/[botId]/marketplace',
        icon: ShoppingCartIcon,
      },
      {
        title: t('Sidebar.Settings'),
        href: '/bots/[botId]/settings',
        icon: SettingsIcon,
        nested: true,
      },
    ],
    [t],
  );

  return (
    <div
      className={`flex h-full w-60 flex-col overflow-auto border-r`}
    >
      <div className="flex min-h-36 flex-col justify-center gap-4 border-b bg-background px-2">
        <Link href="/">
          <Image
            alt="logo"
            src={'/logo.png'}
            width={50}
            height={50}
            className="rounded-xl shadow-md"
            draggable={false}
          />
        </Link>
        <Select
          onValueChange={(href) => {
            r.push(href);
          }}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={activeBot?.name}
            />
          </SelectTrigger>
          <SelectContent>
            {bots.length === 1 ? (
              <p className="p-2">
                {t('Common.No bots')}
              </p>
            ) : (
              <SelectGroup>
                <SelectLabel>
                  {t('Common.All bots')}
                </SelectLabel>
                {bots
                  .filter(
                    (bot) =>
                      bot.id !== params.botId,
                  )
                  .map((bot) => (
                    <SelectItem
                      key={bot.id}
                      value={`/bots/${bot.id}`}
                    >
                      {bot.name}
                    </SelectItem>
                  ))}
              </SelectGroup>
            )}
            <div className="p-2">
              <Link href="/bots/create">
                <Button
                  size="sm"
                  className="w-full"
                  icon={<PlusIcon size={20} />}
                />
              </Link>
            </div>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="flex h-20 items-center justify-center gap-2 border-b px-2">
          <Button
            className="w-full"
            variant={
              status === 1
                ? 'destructive'
                : 'default'
            }
            onClick={async () => {
              try {
                if (status === 1) {
                  await stopBot.mutateAsync(
                    params.botId as string,
                  );
                  setStatus(0);
                  toast.success('Bot stopped');
                } else {
                  await startBot.mutateAsync(
                    params.botId as string,
                  );
                  setStatus(1);
                  toast.success('Bot started');
                }
              } catch (e) {
                if (
                  e instanceof TRPCClientError
                ) {
                  toast.error(e.message);
                }
              }
            }}
            isLoading={
              startBot.isLoading ||
              stopBot.isLoading
            }
          >
            {status === 1
              ? t('Common.Stop')
              : t('Common.Start')}
          </Button>
          <Button
            className="w-full"
            variant="outline"
            disabled={status !== 1}
            onClick={() => {
              restartBot.mutate(
                params.botId as string,
              );
            }}
            isLoading={restartBot.isLoading}
          >
            {t('Common.Restart')}
          </Button>
        </div>

        <div className="space-y-1 px-2">
          {options.map((option, index) => {
            const parsed = option.href.replace(
              /\[([^\]]+)\]/g,
              (_, key) => {
                return params[key] as string;
              },
            );
            let isActive = pathname === parsed;

            if (option.nested) {
              isActive =
                pathname.startsWith(parsed);
            }

            return (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.05,
                }}
              >
                <Link
                  href={parsed}
                  className={`flex cursor-default items-center gap-2 rounded-lg px-4 py-2 ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent'
                  }`}
                  draggable="false"
                >
                  <option.icon size={20} />
                  <span>{option.title}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="flex-1" />

      <div className="p-2">
        <Card className="p-4">
          <CardTitle className="text-md">
            {t('Feedback.Title')}
          </CardTitle>
          <CardDescription>
            {t('Feedback.Description')}
          </CardDescription>
          <Link
            href="tg://resolve?domain=chatbotmate"
            target="_blank"
          >
            <Button
              size="sm"
              className="mt-2 w-full"
              variant="outline"
            >
              {t('Feedback.Send feedback')}
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}

export default Sidebar;
