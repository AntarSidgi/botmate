import { useTranslations } from 'next-intl';

import DebugBot from '#/components/bots/debug';
import Header from '#/components/common/header';

function Page() {
  const t = useTranslations();

  return (
    <>
      <Header title={t('Debug.Title')} />
      <DebugBot />
    </>
  );
}

export default Page;
