import {
    summarizeText,
    analyzeSentiment,
    suggestEventTime,
    suggestVolunteers
  } from '../services/geminiService.js';
  
  const resolvers = {
    Query: {
      healthCheck: () => 'AI service is healthy'
    },
    Mutation: {
      summarizeDiscussion: async (_, { text }) => summarizeText(text),
      classifyReviewSentiment: async (_, { text }) => analyzeSentiment(text),
      predictBestEventTime: async (_, { title, description, location }) =>
        suggestEventTime(title, description, location),
      suggestVolunteerMatches: async (_, { description, skills }) =>
        suggestVolunteers(description, skills)
    }
  };
  
  export default resolvers;