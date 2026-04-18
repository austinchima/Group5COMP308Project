import Business from '../models/Business.js';
import Review from '../models/Review.js';
import Event from '../models/Event.js';

const requireAuth = (user) => {
  if (!user) throw new Error('Not authenticated');
};

const resolvers = {
  Query: {
    businesses: async () => Business.find().sort({ createdAt: -1 }),

    reviews: async (_, { businessId }) =>
      Review.find({ businessId }).sort({ createdAt: -1 }),

    events: async () => Event.find().sort({ createdAt: -1 })
  },

  Mutation: {
    createBusiness: async (
      _,
      { name, description, category, location, imageUrl, deals },
      { user }
    ) => {
      requireAuth(user);

      if (user.role !== 'BUSINESS_OWNER') {
        throw new Error('Only business owners can create businesses');
      }

      return Business.create({
        ownerId: user.id,
        ownerName: user.name,
        name,
        description,
        category,
        location,
        imageUrl,
        deals
      });
    },

    addReview: async (_, { businessId, rating, comment }, { user }) => {
      requireAuth(user);

      return Review.create({
        businessId,
        userId: user.id,
        userName: user.name,
        rating,
        comment
      });
    },

    updateReviewSentiment: async (_, { reviewId, sentiment }, { user }) => {
      requireAuth(user);

      const review = await Review.findById(reviewId);
      if (!review) throw new Error('Review not found');

      review.sentiment = sentiment;
      await review.save();
      return review;
    },

    respondToReview: async (_, { reviewId, response }, { user }) => {
      requireAuth(user);

      const review = await Review.findById(reviewId);
      if (!review) throw new Error('Review not found');

      review.response = response;
      await review.save();
      return review;
    },

    createEvent: async (
      _,
      { title, description, category, date, time, location, capacity },
      { user }
    ) => {
      requireAuth(user);

      if (user.role !== 'COMMUNITY_ORGANIZER') {
        throw new Error('Only community organizers can create events');
      }

      return Event.create({
        organizerId: user.id,
        organizerName: user.name,
        title,
        description,
        category,
        date,
        time,
        location,
        capacity
      });
    },

    updateEventSuggestedTime: async (
      _,
      { eventId, suggestedBestTime },
      { user }
    ) => {
      requireAuth(user);

      const event = await Event.findById(eventId);
      if (!event) throw new Error('Event not found');

      event.suggestedBestTime = suggestedBestTime;
      await event.save();
      return event;
    },

    assignVolunteer: async (_, { eventId, userId, userName }, { user }) => {
      requireAuth(user);

      const event = await Event.findById(eventId);
      if (!event) throw new Error('Event not found');

      const exists = event.volunteers.some((v) => v.userId === userId);
      if (!exists) {
        event.volunteers.push({ userId, userName });
      }

      await event.save();
      return event;
    }
  }
};

export default resolvers;