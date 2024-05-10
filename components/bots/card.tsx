import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '../ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

type Props = {
  id: string;
  name: string;
  picture: string;
  onDelete: () => void;
};
function BotCard({
  name,
  picture,
  id,
  onDelete,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Image
            src={picture}
            width={100}
            height={100}
            alt={name}
            className="h-12 w-12 rounded-xl"
          />
          <div>
            <CardTitle className="text-lg">
              {name}
            </CardTitle>
            <CardDescription>
              {id}
            </CardDescription>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <Link href={`/bots/${id}`}>
              <Button
                size="sm"
                variant={'outline'}
              >
                Manage
              </Button>
            </Link>
            <Button
              size="sm"
              variant={'destructive'}
              onClick={onDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default BotCard;
