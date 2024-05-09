'use client';

import {
  PlayIcon,
  StopCircleIcon,
} from 'lucide-react';

import { useTranslations } from 'next-intl';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '#/components/ui/tooltip';

import { useDebug } from '#/lib/debug';
import { useStore } from '#/lib/store';

import { Button } from '../ui/button';

function DebugActions() {
  const { currentBot } = useStore();
  const {
    status,
    createInstance,
    deleteInstance,
  } = useDebug();
  const t = useTranslations();

  function handleStart() {
    if (!currentBot) return;
    createInstance(currentBot.token);
  }

  function handleStop() {
    deleteInstance();
  }

  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        icon={
          status === 'online' ? (
            <StopCircleIcon size={20} />
          ) : (
            <PlayIcon size={20} />
          )
        }
        disabled={
          status === 'starting' ||
          status === 'stopping'
        }
        isLoading={
          status === 'starting' ||
          status === 'stopping'
        }
        onClick={
          status === 'online'
            ? handleStop
            : handleStart
        }
        className="capitalize"
      >
        {status === 'online'
          ? t('Common.Stop debugging')
          : t('Common.Start debugging')}
      </Button>

      {/* <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              icon={<StopCircleIcon size={20} />}
              onClick={handleStop}
              disabled={
                status === 'offline' ||
                status === 'stopping'
              }
              isLoading={status === 'stopping'}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Stop Debugging</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider> */}
    </div>
  );
}

export default DebugActions;
