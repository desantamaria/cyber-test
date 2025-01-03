"use client";

import { createExperiment } from "@/app/actions/queries/experiments";
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
import { useState } from "react";
import { toast } from "sonner";

export default function CreateExperiment({
  fetchExperiments,
}: {
  fetchExperiments: () => void;
}) {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name === "") {
      return;
    }
    try {
      await createExperiment({
        updated: new Date(),
        name: name,
      });
      toast.success("Experiment created");
      toast.success("Experiment Runs Entry created");
      fetchExperiments();
      setOpen(false);
    } catch (error) {
      toast.error("Failed to Experiment grader", {
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
          Experiment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Experiment</DialogTitle>
        </DialogHeader>
        <form className="contents" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Experiment Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Create Experiment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
