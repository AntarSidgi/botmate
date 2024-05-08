'use client';

import { motion } from 'framer-motion';
import {
  BugIcon,
  LayoutDashboard,
  PlusIcon,
  SettingsIcon,
  ShoppingCartIcon,
  SquareSlashIcon,
} from 'lucide-react';

import { useMemo } from 'react';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import {
  useParams,
  usePathname,
  useRouter,
} from 'next/navigation';

import { useStore } from '#/lib/store';

import { Button } from '../ui/button';
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
  const { bots } = useStore();

  const activeBot = bots.find(
    (bot) => bot.id === params.botId,
  );

  const options = useMemo(
    () => [
      {
        title: t('Sidebar.Dashboard'),
        href: '/bots/[botId]',
        icon: LayoutDashboard,
      },
      {
        title: t('Sidebar.Commands'),
        href: '/bots/[botId]/commands',
        icon: SquareSlashIcon,
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
      },
    ],
    [t],
  );

  return (
    <div
      className={`relative flex h-full w-60 flex-col gap-4 border-r`}
    >
      <div className="flex flex-col gap-4 border-b bg-white px-2 py-4">
        <Image
          alt="logo"
          src={'/logo.png'}
          width={50}
          height={50}
          className="rounded-xl"
        />
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
                {t('Common.No Bots')}
              </p>
            ) : (
              <SelectGroup>
                <SelectLabel>
                  Select bot
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

      <div className="space-y-1 px-2">
        {options.map((option) => {
          const parsed = option.href.replace(
            /\[([^\]]+)\]/g,
            (_, key) => {
              return params[key] as string;
            },
          );
          const isActive = pathname === parsed;

          return (
            <motion.div key={option.title}>
              <Link
                href={parsed}
                className={`flex cursor-default items-center gap-2 rounded-lg px-4 py-2 ${
                  isActive
                    ? 'bg-primary text-white'
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

      <div className="flex-1" />
    </div>
  );
}

export default Sidebar;
