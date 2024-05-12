'use client';

import git from 'isomorphic-git';
import http from 'isomorphic-git/http/web';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import LightningFS from '@isomorphic-git/lightning-fs';

import { useStore } from '#/lib/store';
import { trpc } from '#/lib/trpc/client';

import { Button } from '../ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

type PluginMeta = {
  name: string;
  description: string;
  repository: string;
};
function PluginList() {
  const { currentBot } = useStore();
  const install =
    trpc.installPlugin.useMutation();
  const [plugins, setPlugins] = useState<
    PluginMeta[]
  >([]);

  async function clonePlugin() {
    const fs = new LightningFS('fs');
    return git.clone({
      fs,
      http,
      dir: '/plugins',
      url: 'https://github.com/botmate/plugins',
      corsProxy:
        'https://cors.isomorphic-git.org',
    });
  }

  async function refetchPlugins() {
    const fs = new LightningFS('fs');
    fs.stat(
      '/plugins',
      undefined,
      async (_, stats) => {
        if (stats) {
          await fs.promises.unlink('/plugins');
        }

        await clonePlugin();
      },
    );
  }

  useEffect(() => {
    const fs = new LightningFS('fs');
    fs.stat(
      '/plugins',
      undefined,
      async (_, stats) => {
        if (!stats) {
          await clonePlugin();
        }

        const pluginsJSON =
          await fs.promises.readFile(
            '/plugins/plugins.json',
            {
              encoding: 'utf8',
            },
          );
        const plugins = JSON.parse(
          pluginsJSON as string,
        );
        setPlugins(plugins);
      },
    );
  }, []);

  return (
    <div className="space-y-2">
      {plugins.map((plugin) => (
        <Card
          key={plugin.name}
          className="relative"
        >
          <CardHeader>
            <CardTitle className="text-md">
              {plugin.name}
            </CardTitle>
            <CardDescription>
              {plugin.description}
            </CardDescription>
          </CardHeader>
          <CardFooter className="gap-2">
            <Button
              isLoading={install.isLoading}
              size="sm"
              onClick={() => {
                install.mutateAsync({
                  botId: currentBot?.id!,
                  repo: plugin.repository,
                });
              }}
            >
              Install
            </Button>
            <Link
              href={plugin.repository}
              target="_blank"
            >
              <Button size="sm" variant="outline">
                View repository
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}

      <Button
        onClick={refetchPlugins}
        size="sm"
        variant="ghost"
      >
        Reload plugins
      </Button>
    </div>
  );
}

export default PluginList;
