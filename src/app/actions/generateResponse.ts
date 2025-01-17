"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function generateResponse(
  systemModel: string,
  systemPrompt: string,
  input: string,
  expected: string,
  evalPrompt: string,
  evalModel: string
) {
  try {
    const response = await fetch(`${API_URL}/api/generateResponse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemModel: systemModel,
        systemPrompt: systemPrompt,
        input: input,
        expected: expected,
        evalPrompt: evalPrompt,
        evalModel: evalModel,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error with status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Server Error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to generate response",
    };
  }
}
