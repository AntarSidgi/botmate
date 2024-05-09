import { redirect } from 'next/navigation';

import Header from '#/components/common/header';
import HandlerEditor from '#/components/handlers/editor';

import services from '#/lib/services';

async function Page({
  params,
}: {
  params: {
    handlerId: string;
    botId: string;
  };
}) {
  const handler = await services.handlers.get(
    parseInt(params.handlerId),
  );
  if (!handler) {
    redirect(`/bots/${params.botId}/handlers`);
  }

  const files = JSON.parse(
    Buffer.from(handler.files ?? '{}').toString(),
  );

  return (
    <>
      <Header title={handler.name} />
      <HandlerEditor
        handlerId={handler.id}
        defaultFiles={files}
      />
    </>
  );
}

export default Page;
