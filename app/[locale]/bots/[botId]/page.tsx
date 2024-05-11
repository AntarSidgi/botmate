import dayjs from 'dayjs';
import greetPlugin from 'dayjs-greet';
import {
  BugIcon,
  CpuIcon,
  MessageSquareIcon,
  Users,
} from 'lucide-react';
import prettyBytes from 'pretty-bytes';

import { Card } from '#/components/ui/card';

import DashboardActions from '#/components/actions/dashboard';
import Header from '#/components/common/header';
import MessageAnalytics from '#/components/dashboard/message-analytics';

dayjs.extend(greetPlugin);

function Page() {
  const stats = [
    {
      title: 'Total messages',
      value: '984.1k',
      icon: MessageSquareIcon,
    },
    {
      title: 'Total users',
      value: '1.2k',
      icon: Users,
    },
    {
      title: 'Errors',
      value: '0',
      icon: BugIcon,
    },
    {
      title: 'Memory usage',
      value: prettyBytes(
        process.memoryUsage().heapUsed,
      ),
      icon: CpuIcon,
    },
  ];
  return (
    <>
      <Header
        title="Dashboard"
        actions={<DashboardActions />}
      />

      <div className="container space-y-4 py-4">
        <h1 className="text-2xl font-semibold">
          {dayjs().greet()}! How are you today?
        </h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <Card
              className="relative overflow-hidden p-2"
              key={stat.title}
            >
              <div className="flex aspect-video w-full items-center justify-center rounded-xl border bg-secondary">
                <stat.icon
                  size={70}
                  className="text-primary"
                />
              </div>

              <div className="p-2">
                <h1 className="text-lg font-semibold">
                  {stat.value}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  {stat.title}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <MessageAnalytics />
      </div>
    </>
  );
}

export default Page;
