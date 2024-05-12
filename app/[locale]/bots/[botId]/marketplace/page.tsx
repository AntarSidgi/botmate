import Header from '#/components/common/header';
import PluginList from '#/components/plugins/list';

function Page() {
  return (
    <>
      <Header title="Marketplace" />
      <div className="container py-4">
        <PluginList />
      </div>
    </>
  );
}

export default Page;
