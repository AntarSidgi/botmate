'use client';

import {
  SaveIcon,
  TrashIcon,
} from 'lucide-react';
import { toast } from 'sonner';

import { useEffect, useState } from 'react';

import {
  useParams,
  useRouter,
} from 'next/navigation';

import Editor from '@monaco-editor/react';

import { trpc } from '#/lib/trpc/client';

import ConfirmModal from '../common/confirm';
import { Button } from '../ui/button';

function HandlerEditor({
  handlerId,
  defaultFiles,
}: {
  handlerId: number;
  defaultFiles?: Record<string, any>;
}) {
  const r = useRouter();
  const params = useParams();

  const utils = trpc.useUtils();
  const saveHandler =
    trpc.saveHandler.useMutation();
  const deleteHandler =
    trpc.deleteHandler.useMutation();

  const [files] = useState(defaultFiles ?? {});

  const [selectedFile] = useState('index.js');
  const [fileContent, setFileContent] =
    useState('');

  function handleSave() {
    saveHandler.mutate({
      id: handlerId,
      files: {
        'index.js': fileContent,
      },
    });
  }

  function handleDelete() {
    deleteHandler
      .mutateAsync(handlerId)
      .then(() => {
        toast.success('Handler deleted');
        r.push(`/bots/${params.botId}/handlers`);

        utils.handlers.invalidate();
      });
  }

  useEffect(() => {
    setFileContent(files[selectedFile] ?? '');
  }, [files, selectedFile]);

  return (
    <div className="h-full overflow-hidden">
      <div className="flex h-12 items-center gap-1 border-b bg-background p-2">
        {/* {Object.keys(files).map((file) => (
          <Button
            key={file}
            size="sm"
            variant={
              selectedFile === file
                ? 'secondary'
                : 'ghost'
            }
            onClick={() => {
              setSelectedFile(file);
            }}
          >
            {file}
          </Button>
        ))}
        <div className="h-6 w-0.5 border-l" /> */}
        <Button
          icon={<SaveIcon size={16} />}
          size="sm"
          variant={'ghost'}
          onClick={handleSave}
          isLoading={saveHandler.isLoading}
        >
          Save
        </Button>
        <ConfirmModal
          title="Delete handler"
          description="Are you sure you want to delete this handler?"
          onConfirm={handleDelete}
        >
          <Button
            icon={<TrashIcon size={16} />}
            size="sm"
            variant={'ghost'}
            isLoading={deleteHandler.isLoading}
          >
            Delete
          </Button>
        </ConfirmModal>
      </div>
      <Editor
        height="100%"
        language={
          selectedFile.endsWith('.js')
            ? 'javascript'
            : 'json'
        }
        defaultValue={
          fileContent ||
          [
            '// This is a demo code, please save to make it work',
            '',
            `const bot = new Composer();`,
            '',
            `bot.command('start', (ctx) => {`,
            `  ctx.reply('Hello world!');`,
            `});`,
            '',
            `module.exports = bot;`,
          ].join('\n')
        }
        options={{
          minimap: {
            enabled: false,
          },
        }}
        onChange={(value) => {
          setFileContent(value || '');
        }}
      />
    </div>
  );
}

export default HandlerEditor;
