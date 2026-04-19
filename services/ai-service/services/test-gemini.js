import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config({ path: "./services/ai-service/.env" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testGemini() {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });
    const prompt =
      "Summarize the following: We are organizing a neighborhood cleanup this Saturday.";
    const result = await model.generateContent(prompt);
    console.log("Success:", result.response.text().trim());
  } catch (error) {
    console.error("Error:", error.message);
  }
}

testGemini();
