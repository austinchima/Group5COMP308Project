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

    editPost: async (_, { postId, title, content }, { user }) => {
      requireAuth(user);
      const post = await Post.findById(postId);
      if (!post) throw new Error("Post not found");
      if (post.authorId !== user.id) throw new Error("Not authorized to edit this post");
      
      post.title = title;
      post.content = content;
      await post.save();
      return post;
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
    
    toggleLikePost: async (_, { postId }, { user }) => {
      requireAuth(user);
      const post = await Post.findById(postId);
      if (!post) throw new Error('Post not found');
      
      const likeIndex = post.likes.indexOf(user.id);
      if (likeIndex > -1) {
        post.likes.splice(likeIndex, 1);
      } else {
        post.likes.push(user.id);
      }
      
      await post.save();
      return post;
    },

    createHelpRequest: async (_, { title, description, category, urgency, neededSkills, location }, { user }) => {
      requireAuth(user);
      return HelpRequest.create({
        requesterId: user.id,
        requesterName: user.name,
        title,
        description,
        category: category || 'General',
        urgency: urgency || 'Normal',
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

    createEmergencyAlert: async (_, { title, description, type, severity, location }, { user }) => {
      requireAuth(user);
      return EmergencyAlert.create({
        reporterId: user.id,
        reporterName: user.name,
        title,
        description,
        type: type || 'Safety',
        severity: severity || 'MEDIUM',
        location
      });
    }
  }
};

export default resolvers;