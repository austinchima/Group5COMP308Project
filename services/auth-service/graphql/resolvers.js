import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user?.id) return null;
      return User.findById(user.id);
    },
    users: async () => User.find()
  },

  Mutation: {
    register: async (_, { name, email, password, role, location, interests }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error('User already exists');

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        location,
        interests
      });

      const token = generateToken(user);
      return { token, user };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error('Invalid credentials');

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error('Invalid credentials');

      const token = generateToken(user);
      return { token, user };
    }
  }
};

export default resolvers;