'use client';

import {
  BarChart2Icon,
  HomeIcon,
  LucideIcon,
  MoonIcon,
  PlusIcon,
  SunIcon,
} from 'lucide-react';

import { useToggle } from 'react-use';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '#/components/ui/button';

type MenuItem = {
  label: string;
  path: string;
  icon: LucideIcon;
  regex?: RegExp;
};
const items: MenuItem[] = [
  {
    label: 'Home',
    path: '/',
    icon: HomeIcon,
  },
  {
    label: 'Analytics',
    path: '/analytics',
    icon: BarChart2Icon,
  },
];

function HomeMenu() {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();

  return (
    <>
      <div className="flex items-center gap-2 border-b">
        {items.map((item) => {
          const active = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
            >
              <div
                className={`flex cursor-pointer items-center gap-2 border-b-4 p-2 ${
                  active
                    ? 'border-primary'
                    : 'border-transparent text-gray-500 hover:opacity-80'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
        <div className="flex-1" />
        <Link href="/bots/create">
          <Button size="sm">
            <PlusIcon className="mr-1" /> Add bot
          </Button>
        </Link>
        <Button
          size="sm"
          onClick={() => {
            setTheme(
              theme === 'dark' ? 'light' : 'dark',
            );
          }}
        >
          {theme === 'dark' ? (
            <SunIcon size={20} />
          ) : (
            <MoonIcon size={20} />
          )}
        </Button>
      </div>
    </>
  );
}

export default HomeMenu;
