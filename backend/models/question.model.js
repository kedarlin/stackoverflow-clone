import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    problemDetails: {
      type: String,
      required: true,
    },
    triedDetails: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    votes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Question = mongoose.model('Question', questionSchema);

export default Question;
