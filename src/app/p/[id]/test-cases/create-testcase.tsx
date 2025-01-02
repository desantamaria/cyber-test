"use client";

import { createTestCase } from "@/app/actions/queries/test-case";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateTestCase({
  fetchTestCases,
}: {
  fetchTestCases: () => void;
}) {
  const [userMessage, setUserMessage] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [grader, setGrader] = useState("");

  const [open, setOpen] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (grader === "") {
      return;
    }
    try {
      await createTestCase({
        expectedOutput: expectedOutput,
        updated: new Date(),
        grader: 0,
        userMessage: userMessage,
      });
      toast.success("Test Case created");
      fetchTestCases();
      setOpen(false);
    } catch (error) {
      toast.error("Failed to create Test Case", {
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
          Test Case
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Test Case</DialogTitle>
        </DialogHeader>
        <form className="contents" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="userMessage">User Message</Label>
            <Textarea
              id="userMessage"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            />

            <Label htmlFor="expectedOutput">Expected Output</Label>
            <Textarea
              id="expectedOutput"
              value={expectedOutput}
              onChange={(e) => setExpectedOutput(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Create Test Case</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
