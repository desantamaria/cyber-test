"use client";

import { createPrompt } from "@/app/actions/queries/prompt";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CreatePrompt() {
  const [modelName, setModelName] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (modelName === "") {
      return;
    }
    try {
      //   if (!session.user?.id) {
      //     throw Error("User not found");
      //   }
      const promptId = await createPrompt({
        modelName: modelName,
        updated: new Date(),
        prompt: "",
        message: "",
      });
      toast.success("Prompt created");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to create project", {
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusIcon />
          Prompt
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Prompt</DialogTitle>
        </DialogHeader>
        <form className="contents" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="modelName">LLM Model</Label>
            <Input
              id="modelName"
              type="text"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Create Prompt</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
