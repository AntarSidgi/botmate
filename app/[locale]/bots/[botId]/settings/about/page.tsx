import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card';

import Header from '#/components/common/header';

function Page() {
  return (
    <>
      <Header title="About" />

      <div className="container space-y-4 py-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-md">
              BotMate
            </CardTitle>
            <CardDescription>
              Bot development platform for
              Telegram. Add your own bot and
              manage it easily.
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-md">
                v{process.env.version}
              </CardTitle>
              <CardDescription>
                version
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-md">
                {process.env.gitSHA?.slice(0, 7)}
              </CardTitle>
              <CardDescription>
                git commit
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Page;
