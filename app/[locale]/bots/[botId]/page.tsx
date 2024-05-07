import DashboardActions from '#/components/actions/dashboard';
import Header from '#/components/common/header';

function Page() {
  return (
    <>
      <Header
        title="Dashboard"
        actions={<DashboardActions />}
      />
    </>
  );
}

export default Page;
