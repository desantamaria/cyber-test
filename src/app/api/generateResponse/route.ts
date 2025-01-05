import { Message, PerformGroq } from "@/app/utils/chat";
import { PerformGemini } from "@/app/utils/eval";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    /* 
    Input: Question
    Expected: Expected Output
    Output: Actual output generated from groq
    */
    const {
      systemModel,
      systemPrompt,
      input,
      expected,
      evalPrompt,
      evalModel,
    } = await request.json();

    // Prepare for GROQ
    const messages: Message[] = [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: input,
      },
    ];

    // Output: Actual output generated from groq
    const output = await PerformGroq(systemModel, messages);

    const geminiPrompt = `
    ${evalPrompt}

    Please consider the original prompt:
    ${systemPrompt}

    Given the expected output: ${expected}

    Also given the actual output: ${output}

    Give a percentage correctness score of the actual output versus the expected output.
    `;

    const evalResult = await PerformGemini(evalModel, geminiPrompt);

    return NextResponse.json({
      success: true,
      result: evalResult,
    });
  } catch (error) {
    console.error(`Failed to process request: ${error}`);
    return NextResponse.json(
      { success: false, error: "Failed to process request" },
      { status: 500 }
    );
  }
}
