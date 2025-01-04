import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Chat completion with Mixtral
    // const chatResponse = await client.chatCompletion({
    //   model: "mixtral-8x7b-32768",
    //   messages: [
    //     { role: "system", content: "You are a helpful assistant." },
    //     { role: "user", content: "What is the capital of France?" },
    //   ],
    //   temperature: 0.7,
    // });

    // const result = chatResponse.message.content;

    return NextResponse.json({
      success: true,
      result: "result",
    });
  } catch (error) {
    console.error(`Failed to process request: ${error}`);
    return NextResponse.json(
      { success: false, error: "Failed to process request" },
      { status: 500 }
    );
  }
}
