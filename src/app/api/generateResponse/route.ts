import { Message, PerformGroq } from "@/app/utils/chat";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { promptModel, promptMessage, testCase, grader } =
      await request.json();

    console.log(promptModel);
    console.log(promptMessage);
    console.log(testCase);
    console.log(grader);

    // Prepare for GROQ
    const messages: Message[] = [
      {
        role: "system",
        content: promptMessage,
      },
      {
        role: "user",
        content: `${promptMessage}`,
      },
    ];
    const groqResult = await PerformGroq(messages);
    // const evalResult = await PerformGemini(`${groqResult}`);

    return NextResponse.json({
      success: true,
      result: groqResult,
    });
  } catch (error) {
    console.error(`Failed to process request: ${error}`);
    return NextResponse.json(
      { success: false, error: "Failed to process request" },
      { status: 500 }
    );
  }
}
