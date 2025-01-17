"use client";

import { use, useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";

import { GROQ_MODELS } from "@/models/groq";

import { generateResponse } from "@/app/actions/generateResponse";
import { listTestCases } from "@/app/actions/queries/test-case";
import { listGraders } from "@/app/actions/queries/grader";
import { gradersTable, testCaseTable } from "@/db/schema";

export default function ExperimentPage({
  params,
}: {
  params: Promise<{ id: string; experimentId: string }>;
}) {
  const { id, experimentId } = use(params);

  const [result, setResult] = useState("");
  const [testCases, setTestCases] = useState<
    (typeof testCaseTable.$inferSelect)[] | []
  >([]);
  const [graders, setGraders] = useState<
    (typeof gradersTable.$inferSelect)[] | []
  >([]);

  // New state variables for selections
  const [selectedModel, setSelectedModel] = useState("");
  const [prompt, setPrompt] = useState("");
  const [selectedTestCase, setSelectedTestCase] = useState("");
  const [selectedGrader, setSelectedGrader] = useState("");

  async function handleExperimentRun() {
    const selectedTestCaseData = testCases.find(
      (testCase) => testCase.id.toString() === selectedTestCase
    );
    const selectedGraderData = graders.find(
      (grader) => grader.id.toString() === selectedGrader
    );
    // Use the selected values here
    console.log("Selected Model:", selectedModel);
    console.log("Prompt:", prompt);
    console.log("Selected Test Case:", selectedTestCaseData);
    console.log("Selected Grader:", selectedGraderData);
    // You can now use these values to generate the response
    const result = await generateResponse(
      selectedModel,
      prompt,
      selectedTestCaseData?.userMessage || "",
      selectedTestCaseData?.expectedOutput || "",
      selectedGraderData?.prompt || "",
      selectedGraderData?.modelName || ""
    );
    console.log(result);
    setResult(result.result);
  }

  const fetchTestCases = async () => {
    try {
      const testCasesData = await listTestCases();
      setTestCases(testCasesData!);
    } catch (error) {
      console.error("Error fetching Test Cases:", error);
    }
  };

  const fetchGraders = async () => {
    try {
      const gradersData = await listGraders();
      setGraders(gradersData);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchTestCases();
    fetchGraders();
  }, []);

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
                <Select onValueChange={(value) => setSelectedModel(value)}>
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
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>System</Label>
              <Textarea
                placeholder="Enter Prompt here"
                className="min-h-[100px]"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">Test Cases</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Select onValueChange={(value) => setSelectedTestCase(value)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Test Cases" />
                </SelectTrigger>
                <SelectContent>
                  {testCases.map((testCase) => (
                    <SelectItem
                      key={testCase.id}
                      value={testCase.id.toString() || ""}
                    >
                      {testCase.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Selected Test Case: {selectedTestCase}</Label>
          </div>
        </CardContent>
      </Card>
      <Card className="flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">Graders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Select onValueChange={(value) => setSelectedGrader(value)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Grader" />
                </SelectTrigger>
                <SelectContent>
                  {graders.map((grader) => (
                    <SelectItem
                      key={grader.id}
                      value={grader.id.toString() || ""}
                    >
                      {grader.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Selected Grader: {selectedGrader}</Label>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button onClick={handleExperimentRun}>Run Test Case</Button>
      </div>
      {result && (
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-semibold">Test Results</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
