import { useTranslations } from 'next-intl';

import DebugActions from '#/components/actions/debug';
import DebugBot from '#/components/bots/debug';
import Header from '#/components/common/header';

function Page() {
  const t = useTranslations();

  return (
    <>
      <Header
        title={t('Debug.Title')}
        actions={<DebugActions />}
      />
      <DebugBot />
    </>
  );
}

export default Page;
