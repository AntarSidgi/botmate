import {
  CheckCircle2Icon,
  CheckIcon,
  MessageSquareWarningIcon,
  TriangleAlertIcon,
} from 'lucide-react';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card';

import Header from '#/components/common/header';

async function getLatestVersion() {
  const res = await fetch(
    'https://api.github.com/repos/botmate/botmate/tags',
    {
      cache: 'no-cache',
    },
  ).then((res) => res.json());
  return (res[0]?.name as string) ?? '';
}

async function Page() {
  const latestVersion = await getLatestVersion();
  let isLatest =
    process.env.version === latestVersion;
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
          <Card className="relative">
            <CardHeader>
              <CardTitle className="text-md flex flex-row items-center justify-between">
                v{process.env.version}
                {isLatest ? (
                  <CheckCircle2Icon className="text-green-500" />
                ) : (
                  <TriangleAlertIcon className="text-yellow-500" />
                )}
              </CardTitle>
              <CardDescription>
                {isLatest
                  ? 'latest version'
                  : `v${latestVersion} is available`}
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
