import { PromptColumn } from "./prompt-column";

export default function ExperimentPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-4">
        <PromptColumn id="A" label="A" />
        <PromptColumn id="B" label="B" />
        <PromptColumn id="C" label="C" />
      </div>
    </div>
  );
}
