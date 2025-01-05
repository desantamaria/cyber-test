const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini
const client = new GoogleGenerativeAI(process.env["GEMINI_API_KEY"]);

export async function PerformGemini(modelName: string, prompt: string) {
  const model = client.getGenerativeModel({ model: modelName });

  console.log(`Generating evaluation from Gemini`);
  const result = await model.generateContent(prompt);

  console.log(`Successful response from Gemini`);

  return result.response.text();
}
