import jwt from 'jsonwebtoken';

export const getUserFromToken = (token) => {
  try {
    if (!token) return null;
    const cleanedToken = token.replace('Bearer ', '');
    return jwt.verify(cleanedToken, process.env.JWT_SECRET);
  } catch {
    return null;
  }
};