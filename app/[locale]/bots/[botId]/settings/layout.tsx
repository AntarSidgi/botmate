'use client';

import {
  BotIcon,
  BrushIcon,
  SlashSquareIcon,
} from 'lucide-react';

import { useMemo } from 'react';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import {
  useParams,
  usePathname,
} from 'next/navigation';

import Header from '#/components/common/header';

function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const t = useTranslations();
  const pathname = usePathname();

  const options = useMemo(
    () => [
      {
        icon: BrushIcon,
        title: t('Settings.General.Title'),
        description: t(
          'Settings.General.Description',
        ),
        href: '/bots/[botId]/settings',
      },
      {
        icon: BotIcon,
        title: t('Settings.Bot.Title'),
        description: t(
          'Settings.Bot.Description',
        ),
        href: '/bots/[botId]/settings/bot',
      },
      {
        icon: SlashSquareIcon,
        title: t('Settings.Command.Title'),
        description: t(
          'Settings.Command.Description',
        ),
        href: '/bots/[botId]/settings/command',
      },
    ],
    [t],
  );

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="w-72 overflow-auto border-r bg-background">
        <Header title={t('Common.Settings')} />

        {options.map((option) => {
          const parsed = option.href.replace(
            /\[([^\]]+)\]/g,
            (_, key) => {
              return params[key] as string;
            },
          );
          const isActive = pathname === parsed;

          return (
            <Link
              key={option.title}
              href={parsed}
              className="cursor-default"
            >
              <div
                className={`flex h-20 items-center gap-2 border-b p-4 ${
                  isActive
                    ? 'bg-primary-foreground'
                    : 'hover:bg-primary-foreground'
                }`}
              >
                <div
                  className={`rounded-md p-3 ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <option.icon size={20} />
                </div>
                <div>
                  <h1>{option.title}</h1>
                  <p className="line-clamp-1 text-sm">
                    {option.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="h-full flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}

export default Layout;
