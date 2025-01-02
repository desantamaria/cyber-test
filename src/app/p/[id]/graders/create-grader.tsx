"use client";

import { createGrader } from "@/app/actions/queries/grader";
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
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateGrader({
  fetchPrompts,
}: {
  fetchPrompts: () => void;
}) {
  const [modelName, setModelName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name === "" || prompt == "" || modelName == "") {
      return;
    }
    try {
      await createGrader({
        modelName: modelName,
        updated: new Date(),
        prompt: prompt,
        name: name,
      });
      toast.success("Grader created");
      fetchPrompts();
      setOpen(false);
    } catch (error) {
      toast.error("Failed to create grader", {
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
          Grader
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Grader</DialogTitle>
        </DialogHeader>
        <form className="contents" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Grader Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Label htmlFor="modelName">LLM Model Name</Label>
            <Input
              id="modelName"
              type="text"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
            />

            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Create Grader</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
