import { getTranslations } from 'next-intl/server';

import Header from '#/components/common/header';
import HandlerList from '#/components/handlers/list';

import services from '#/lib/services';

async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations();

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex w-72 flex-col overflow-auto border-r bg-background">
        <Header title={t('Sidebar.Handlers')} />
        <HandlerList />
      </div>
      <div className="h-full flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}

export default Layout;
