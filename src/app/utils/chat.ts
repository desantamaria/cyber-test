import Groq from "groq-sdk";

export type Message = {
  role: "user" | "system";
  content: string;
};

// Initialize Groq
const client = new Groq({
  apiKey: process.env["GROQ_API_KEY"],
});

export async function PerformGroq(messages: Message[]) {
  console.log(`Generating response from Groq Client`);
  const chatCompletion = await client.chat.completions.create({
    messages: messages,
    model: "llama3-8b-8192",
  });

  console.log(`Successful response from Groq Client`);

  return chatCompletion.choices[0].message.content;
}
