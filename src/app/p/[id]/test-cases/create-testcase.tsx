"use client";

import { listGraders } from "@/app/actions/queries/grader";
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
import { gradersTable } from "@/db/schema";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateTestCase({
  fetchTestCases,
}: {
  fetchTestCases: () => void;
}) {
  const [userMessage, setUserMessage] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [selectedGrader, setSelectedGrader] = useState("");
  const [graders, setGraders] = useState<
    (typeof gradersTable.$inferSelect)[] | []
  >([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchGraders = async () => {
      try {
        const gradersData = await listGraders();
        setGraders(gradersData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchGraders();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedGrader === "") {
      toast.error("Please select a grader");
      return;
    }
    try {
      await createTestCase({
        expectedOutput: expectedOutput,
        updated: new Date(),
        grader: parseInt(selectedGrader),
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
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="grader">Select Grader</Label>
              <Select
                value={selectedGrader}
                onValueChange={(value) => setSelectedGrader(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a grader" />
                </SelectTrigger>
                <SelectContent>
                  {graders.map((grader) => (
                    <SelectItem key={grader.id} value={grader.id.toString()}>
                      {grader.name || `Grader ${grader.id}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="userMessage">User Message</Label>
              <Textarea
                id="userMessage"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="expectedOutput">Expected Output</Label>
              <Textarea
                id="expectedOutput"
                value={expectedOutput}
                onChange={(e) => setExpectedOutput(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Test Case</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
