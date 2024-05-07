import SetBots from '#/components/bots/set';
import Sidebar from '#/components/common/sidebar';

import services from '#/lib/services';

async function Layout({
  children,
}: {
  children: React.ReactNode;
  params: {
    botId: string;
  };
}) {
  const bots = await services.bots.all();
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-auto bg-muted">
          {children}
        </div>
      </div>

      <SetBots bots={bots} />
    </>
  );
}

export default Layout;
