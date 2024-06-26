import { redirect } from 'next/navigation';

import SetBots from '#/components/bots/set';
import Sidebar from '#/components/common/sidebar';

import services from '#/lib/services';

async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    botId: string;
  };
}) {
  const bots = await services.bots.all();
  const currentBot = await services.bots.get(
    params.botId,
  );
  if (!currentBot) {
    redirect('/');
  }
  return (
    <SetBots bots={bots} currentBot={currentBot}>
      <div className="flex h-screen overflow-hidden border-t">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-auto bg-muted">
          {children}
        </div>
      </div>
    </SetBots>
  );
}

export default Layout;
