'use client';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';
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

import Loader from '../common/loader';
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
    <div className="flex h-full flex-1 flex-col overflow-hidden">
      {handlers.data?.length === 0 && (
        <div className="flex flex-1 items-center justify-center text-muted-foreground">
          No handlers found
        </div>
      )}

      {handlers.isLoading && (
        <div className="space-y-2 overflow-hidden p-2">
          <Loader count={20} />
        </div>
      )}

      <div className="flex-1 overflow-auto">
        <AnimatePresence>
          {handlers.data?.map(
            (handler, index) => {
              const isSelected =
                handler.id ===
                Number(params.handlerId);
              return (
                <motion.div
                  key={handler.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <Link
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
                                variant={
                                  'outline'
                                }
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
                </motion.div>
              );
            },
          )}
        </AnimatePresence>
      </div>

      <div className="flex min-h-16 w-full items-center justify-center border-t px-4">
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
            className="w-full"
            icon={<PlusIcon size={18} />}
            disabled={handlers.isLoading}
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
