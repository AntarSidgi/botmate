'use client';

import {
  PlayIcon,
  RefreshCwIcon,
  StopCircleIcon,
} from 'lucide-react';

import { Button } from '../ui/button';

function DashboardActions() {
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        icon={<PlayIcon size={20} />}
      >
        Start
      </Button>
      <Button
        variant="ghost"
        size="sm"
        icon={<StopCircleIcon size={20} />}
        disabled
      >
        Stop
      </Button>
      <Button
        variant="ghost"
        size="sm"
        icon={<RefreshCwIcon size={20} />}
        disabled
      >
        Restart
      </Button>
    </>
  );
}

export default DashboardActions;
