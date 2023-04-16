import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { shallow } from "zustand/shallow";
import { createSchemaStore } from "~/components/store/schemaStore";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { TextInputField } from "~/components/ui/form";
import { api } from "~/utils/api";

export function PromptDialog() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.ctrlKey) {
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const { setSchema } = createSchemaStore(
    (state) => ({
      setSchema: state.setSchema,
    }),
    shallow
  );

  const { mutate, isLoading } = api.openai.prismaAiPrompt.useMutation({
    async onSuccess(data) {
      setOpen(false);
      await setSchema(data);
    },
  });

  const methods = useForm({
    defaultValues: {
      prompt:
        "online store, orders table, product table, users table, relations between tables",
    },
  });

  const { handleSubmit } = methods;
  const handlePrompt = handleSubmit(({ prompt }) => {
    mutate(prompt);
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="ghost" size="sm" className="text-lg">
          🤖 ⌘K
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Describe your Database Schema to your AI assistant 🤖
          </DialogTitle>
          <FormProvider {...methods}>
            <form onSubmit={handlePrompt}>
              <TextInputField name="prompt" label="Prompt" />

              <Button
                type="submit"
                className="mt-5 w-full"
                disabled={isLoading}
              >
                Apply
              </Button>
            </form>
          </FormProvider>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
