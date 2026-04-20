import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    text: { type: String, required: true }
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    authorId: { type: String, required: true },
    authorName: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    summary: { type: String, default: '' },
    comments: [commentSchema],
    likes: [{ type: String }],
    tags: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model('Post', postSchema);