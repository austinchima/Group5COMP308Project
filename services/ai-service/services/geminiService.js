import { GoogleGenerativeAI } from "@google/generative-ai";

const getGenAI = () => new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const summarizeText = async (text) => {
  try {
    const model = getGenAI().getGenerativeModel({
      model: "gemini-3-flash-preview",
    });
    const prompt = `Summarize the following community discussion in 2-3 short sentences:\n\n${text}`;
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("Gemini summary error:", error.message);
    return "Summary could not be generated.";
  }
};

export const analyzeSentiment = async (text) => {
  try {
    const model = getGenAI().getGenerativeModel({
      model: "gemini-3-flash-preview",
    });
    const prompt = `Classify the sentiment of this review as Positive, Negative, or Neutral. Return one word only. Review: ${text}`;
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("Gemini sentiment error:", error.message);
    return "Neutral";
  }
};

export const suggestEventTime = async (title, description, location) => {
  try {
    const model = getGenAI().getGenerativeModel({
      model: "gemini-3-flash-preview",
    });
    const prompt = `Suggest the best likely time for a neighborhood community event based on this info. Return one short sentence only. Title: ${title}. Description: ${description}. Location: ${location}.`;
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("Gemini event timing error:", error.message);
    return "Saturday at 11:00 AM";
  }
};

export const suggestVolunteers = async (helpDescription, skills) => {
  return `Suggested volunteer interests: ${skills?.join(", ") || "general community support"}`;
};
