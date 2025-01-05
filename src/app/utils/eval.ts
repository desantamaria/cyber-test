const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini
const client = new GoogleGenerativeAI(process.env["GROQ_API_KEY"]);

export async function PerformGemini(prompt: string) {
  const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });

  console.log(`Generating evaluation from Gemini`);
  const result = await model.generateContent(prompt);

  console.log(`Successful response from Gemini`);

  return result.response.text();
}
