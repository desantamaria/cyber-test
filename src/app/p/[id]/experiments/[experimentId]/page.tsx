"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { GEMINI_MODELS } from "@/models/gemini";
import { GROQ_MODELS } from "@/models/groq";

import { generateResponse } from "@/app/actions/generateResponse";
import { use, useState } from "react";
import { Button } from "@/components/ui/button";

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
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Prompt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="groq" disabled className="font-semibold">
                      GROQ
                    </SelectItem>
                    {GROQ_MODELS.map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        {model.label}
                      </SelectItem>
                    ))}
                    <SelectItem
                      value="gemini"
                      disabled
                      className="font-semibold"
                    >
                      GEMINI
                    </SelectItem>
                    {GEMINI_MODELS.map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        {model.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>System</Label>
              <Textarea
                placeholder="Enter Prompt here"
                className="min-h-[100px]"
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleExperimentRun}>Run Test Cases</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
