import Post from '../models/Post.js';
import HelpRequest from '../models/HelpRequest.js';
import EmergencyAlert from '../models/EmergencyAlert.js';

const requireAuth = (user) => {
  if (!user) throw new Error('Not authenticated');
};

const resolvers = {
  Query: {
    posts: async () => Post.find().sort({ createdAt: -1 }),
    helpRequests: async () => HelpRequest.find().sort({ createdAt: -1 }),
    emergencyAlerts: async () => EmergencyAlert.find().sort({ createdAt: -1 })
  },

  Mutation: {
    createPost: async (_, { title, content, tags }, { user }) => {
      requireAuth(user);
      return Post.create({
        authorId: user.id,
        authorName: user.name,
        title,
        content,
        tags
      });
    },

    updatePostSummary: async (_, { postId, summary }, { user }) => {
      requireAuth(user);
      const post = await Post.findById(postId);
      if (!post) throw new Error('Post not found');
      post.summary = summary;
      await post.save();
      return post;
    },

    addComment: async (_, { postId, text }, { user }) => {
      requireAuth(user);
      const post = await Post.findById(postId);
      if (!post) throw new Error('Post not found');
      post.comments.push({ userId: user.id, userName: user.name, text });
      await post.save();
      return post;
    },

    createHelpRequest: async (_, { title, description, neededSkills, location }, { user }) => {
      requireAuth(user);
      return HelpRequest.create({
        requesterId: user.id,
        requesterName: user.name,
        title,
        description,
        neededSkills,
        location
      });
    },

    updateMatchedVolunteers: async (_, { helpRequestId, volunteers }, { user }) => {
      requireAuth(user);
      const helpRequest = await HelpRequest.findById(helpRequestId);
      if (!helpRequest) throw new Error('Help request not found');
      helpRequest.matchedVolunteers = volunteers;
      await helpRequest.save();
      return helpRequest;
    },

    createEmergencyAlert: async (_, { title, description, severity, location }, { user }) => {
      requireAuth(user);
      return EmergencyAlert.create({
        reporterId: user.id,
        reporterName: user.name,
        title,
        description,
        severity,
        location
      });
    }
  }
};

export default resolvers;