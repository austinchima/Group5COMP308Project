import Post from '../models/Post.js';
import HelpRequest from '../models/HelpRequest.js';
import EmergencyAlert from '../models/EmergencyAlert.js';
import Notification from '../models/Notification.js';

const requireAuth = (user) => {
  if (!user) throw new Error('Not authenticated');
};

const resolvers = {
  Query: {
    posts: async () => Post.find().sort({ createdAt: -1 }),
    helpRequests: async () => HelpRequest.find().sort({ createdAt: -1 }),
    emergencyAlerts: async () => EmergencyAlert.find().sort({ createdAt: -1 }),
    notifications: async (_, __, { user }) => {
      requireAuth(user);
      return Notification.find({ recipientId: user.id }).sort({ createdAt: -1 }).limit(50);
    }
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
      post.comments.push({
        userId: user.id,
        userName: user.name,
        text
      });
      await post.save();

      // Trigger Notification
      if (post.authorId !== user.id) {
        await Notification.create({
          recipientId: post.authorId,
          senderId: user.id,
          senderName: user.name,
          type: 'COMMENT',
          message: `${user.name} commented on your post: "${text.substring(0, 30)}${text.length > 30 ? '...' : ''}"`,
          link: `/feed`
        });
      }

      return post;
    },
    
    toggleLikePost: async (_, { postId }, { user }) => {
      requireAuth(user);
      const post = await Post.findById(postId);
      if (!post) throw new Error('Post not found');
      
      const likeIndex = post.likes.indexOf(user.id);
      if (likeIndex === -1) {
        post.likes.push(user.id);
        
        // Trigger Notification
        if (post.authorId !== user.id) {
          await Notification.create({
            recipientId: post.authorId,
            senderId: user.id,
            senderName: user.name,
            type: 'LIKE',
            message: `${user.name} liked your post.`,
            link: `/feed`
          });
        }
      } else {
        post.likes.splice(likeIndex, 1);
      }
      await post.save();
      return post;
    },

    markNotificationAsRead: async (_, { notificationId }, { user }) => {
      requireAuth(user);
      const notif = await Notification.findById(notificationId);
      if (!notif || notif.recipientId !== user.id) throw new Error('Notification not found');
      notif.isRead = true;
      await notif.save();
      return notif;
    },

    markAllNotificationsAsRead: async (_, __, { user }) => {
      requireAuth(user);
      await Notification.updateMany({ recipientId: user.id, isRead: false }, { isRead: true });
      return true;
    },

    createNotification: async (_, { recipientId, type, message, link }, { user }) => {
      // Internal/Gateway use
      requireAuth(user);
      return Notification.create({
        recipientId,
        senderId: user.id,
        senderName: user.name || 'System',
        type,
        message,
        link: link || ''
      });
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

    offerHelpToRequest: async (_, { requestId }, { user }) => {
      requireAuth(user);
      const helpRequest = await HelpRequest.findById(requestId);
      if (!helpRequest) throw new Error('Help request not found');

      const exists = helpRequest.matchedVolunteers.some(v => v.userId === user.id);
      if (!exists) {
        helpRequest.matchedVolunteers.push({
          userId: user.id,
          userName: user.name
        });
        await helpRequest.save();

        // Trigger Notification
        if (helpRequest.requesterId !== user.id) {
          await Notification.create({
            recipientId: helpRequest.requesterId,
            senderId: user.id,
            senderName: user.name,
            type: 'OFFER_HELP',
            message: `${user.name} offered to help with: "${helpRequest.title}"`,
            link: `/help`
          });
        }
      }

      return helpRequest;
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