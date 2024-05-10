import BotList from '#/components/bots/list';
import HomeLayout from '#/components/common/home/layout';

import services from '#/lib/services';

async function Page() {
  const bots = await services.bots.all();

  return (
    <HomeLayout>
      <BotList bots={bots} />
    </HomeLayout>
  );
}

export default Page;
