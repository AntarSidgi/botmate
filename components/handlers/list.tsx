'use client';

import {
  CopyIcon,
  EllipsisVerticalIcon,
  PlusIcon,
  Share2Icon,
  TextIcon,
  TrashIcon,
} from 'lucide-react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu';

import { useStore } from '#/lib/store';
import { trpc } from '#/lib/trpc/client';

import PromptModal from '../common/prompt';
import { Button } from '../ui/button';

function HandlerList() {
  const params = useParams();
  const { currentBot } = useStore();
  const handlers = trpc.handlers.useQuery(
    {
      botId: currentBot?.id!,
    },
    {
      enabled: Boolean(currentBot),
    },
  );

  const createHandler =
    trpc.createHandler.useMutation();

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      {handlers.data?.length === 0 && (
        <div className="flex flex-1 items-center justify-center text-muted-foreground">
          No handlers found
        </div>
      )}

      <div className="flex-1">
        {handlers.data?.map((handler) => {
          const isSelected =
            handler.id ===
            Number(params.handlerId);
          return (
            <Link
              key={handler.id}
              href={`/bots/${params.botId}/handlers/${handler.id}`}
              className="cursor-default select-none"
              draggable={false}
            >
              <div
                className={`flex h-20 items-center justify-between gap-2 border-b p-4 ${
                  isSelected
                    ? 'bg-primary-foreground'
                    : ''
                }`}
              >
                <span>{handler.name}</span>
                {isSelected && (
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                      >
                        <Button
                          size="xs"
                          variant={'outline'}
                          icon={
                            <EllipsisVerticalIcon
                              size={14}
                            />
                          }
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem>
                          <CopyIcon className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <TextIcon className="mr-2 h-4 w-4" />
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <TrashIcon className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2Icon className="mr-2 h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex h-16 w-full items-center justify-center border-t px-4">
        <PromptModal
          title="Create Handler"
          description="Create a new handler."
          inputs={[
            {
              id: 'name',
              placeholder: 'Enter handler name',
            },
          ]}
          onSubmit={(data) => {
            createHandler
              .mutateAsync({
                name: data.name,
                botId: currentBot!.id,
              })
              .then(() => {
                handlers.refetch();
              });
          }}
        >
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            icon={<PlusIcon size={18} />}
            isLoading={createHandler.isLoading}
          >
            Create Handler
          </Button>
        </PromptModal>
      </div>
    </div>
  );
}

export default HandlerList;
