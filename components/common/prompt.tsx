'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

function PromptModal({
  title,
  description,
  children,
  inputs,
  onSubmit,
}: {
  title: string;
  description: string;
  onSubmit: (
    data: Record<string, string>,
  ) => void;
  children?: React.ReactNode;

  inputs: {
    id: string;
    placeholder: string;
  }[];
}) {
  const form = useForm();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 py-2">
          {inputs.map(({ id, placeholder }) => (
            <div key={id}>
              <Input
                id="name"
                placeholder={placeholder}
                {...form.register(id)}
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              onSubmit(form.getValues());
              form.reset();
              setIsOpen(false);
            }}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PromptModal;
