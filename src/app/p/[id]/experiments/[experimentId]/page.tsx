"use client";

import { use, useState } from "react";
import { PromptColumn } from "./prompt-column";
import { Button } from "@/components/ui/button";
import { generateResponse } from "@/app/actions/generateResponse";

export default function ExperimentPage({
  params,
}: {
  params: Promise<{ id: string; experimentId: string }>;
}) {
  const { id, experimentId } = use(params);

  const [result, setResult] = useState("");

  async function handleExperimentRun() {
    const result = await generateResponse("Hi");
    console.log(result);
    setResult(result);
  }
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-4">
        <PromptColumn id="A" label="A" />
        <PromptColumn id="B" label="B" />
      </div>
      <div className="flex justify-end py-2">
        <Button className="w-[50px]" onClick={handleExperimentRun}>
          Run
        </Button>
      </div>
    </div>
  );
}

const testCases = [
  {
    id: 1,
    input: "(72-49)*(15-5*3)+\n(62-36)*(2*4-8)+sin(0)+log(1)",
    expected: "0",
    outputs: [
      {
        promptId: "A",
        content:
          "To solve the given expression, we need to follow the order of operations (PEMDAS)...",
        duration: "0.71s",
        score: "0.00%",
      },
      {
        promptId: "B",
        content:
          "Let's break down the expression and calculate each part step by step...",
        duration: "1.28s",
        score: "0.00%",
      },
      {
        promptId: "C",
        content:
          "The expression given is:\n((72 - 49) * (15 - 5 * 3)) + ((62 - 36) * (2 * 4 - 8)) + sin(0) + log(1)",
        duration: "1.10s",
        score: "0.00%",
      },
    ],
  },
  {
    id: 2,
    input: "1+1",
    expected: "2",
    outputs: [
      {
        promptId: "A",
        content: "2",
        duration: "0.89s",
        score: "0.00%",
      },
      {
        promptId: "B",
        content: "2",
        duration: "1.10s",
        score: "0.00%",
      },
      {
        promptId: "C",
        content: "2",
        duration: "0.95s",
        score: "0.00%",
      },
    ],
  },
];
