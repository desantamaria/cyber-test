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

interface PromptColumnProps {
  id: string;
  label: string;
}

export function PromptColumn({ id, label }: PromptColumnProps) {
  return (
    <Card className="flex-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Prompt {label}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Select defaultValue="llama">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="llama">LLaMA 3.3 70b Versatile</SelectItem>
                <SelectItem value="mixtral">Mixtral 8x7B 32768</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label>System</Label>
          <Textarea placeholder="Enter Prompt here" className="min-h-[100px]" />
        </div>
        <div className="space-y-2">
          <Label>User</Label>
          <Textarea placeholder="{{input}}" className="min-h-[100px]" />
        </div>
      </CardContent>
    </Card>
  );
}
