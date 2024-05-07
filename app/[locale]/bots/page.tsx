import Image from 'next/image';
import Link from 'next/link';

import { Button } from '#/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card';

import services from '#/lib/services';

async function Page() {
  const bots = await services.bots.all();

  return (
    <div className="flex h-screen items-center justify-center bg-muted">
      <Card className="w-[25rem]">
        <CardHeader>
          <CardTitle>Select a bots</CardTitle>
          <CardDescription>
            Select a bot to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {bots.map((bot) => (
            <Link
              key={bot.id}
              href={`/bots/${bot.id}`}
              className="cursor-default"
            >
              <Card className="flex items-center gap-4 p-4 hover:bg-muted">
                <Image
                  alt="logo"
                  src={bot.picture ?? ''}
                  width={100}
                  height={100}
                  className="h-12 w-12 rounded-xl"
                />
                <div>
                  <h1 className="">{bot.name}</h1>
                  <p className="text-sm text-muted-foreground">
                    {bot.id}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </CardContent>
        <CardFooter>
          <Link href="/bots/create">
            <Button>Create Bot</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Page;
