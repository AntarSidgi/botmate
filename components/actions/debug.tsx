'use client';

import {
  PlayIcon,
  StopCircleIcon,
} from 'lucide-react';

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

  function handleStart() {
    if (!currentBot) return;
    createInstance(currentBot.token);
  }

  function handleStop() {
    deleteInstance();
  }

  return (
    <div>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              icon={<PlayIcon size={20} />}
              disabled={
                status === 'online' ||
                status === 'starting'
              }
              isLoading={status === 'starting'}
              onClick={handleStart}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Start Debugging</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
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
      </TooltipProvider>
    </div>
  );
}

export default DebugActions;
