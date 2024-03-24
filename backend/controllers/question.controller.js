import Question from '../models/question.model.js';
import { errorHandler } from '../utils/error.js';

export const createQuestion = async (req, res, next) => {
  if (!req.body.title || !req.body.problemDetails || !req.body.triedDetails || !req.body.tags) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }

  const newQuestion = new Question({
    ...req.body,
  });

  try {
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    next(error);
  }
};

export const getQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find();

    res.status(200).json(questions);
  } catch (error) {
    next(error);
  }
};
export const getQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.questionId);
    if (!question) {
      return next(errorHandler(404, 'Question not found'));
    }

    res.status(200).json(question);
  } catch (error) {
    next(error);
  }
};
export const deleteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.questionId);
    if (!question) {
      return next(errorHandler(404, 'Question not found'));
    }

    if (question.userId !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to delete this question'));
    }

    await question.remove();
    res.status(200).json('The question has been deleted');
  } catch (error) {
    next(error);
  }
};

export const updateQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.questionId);
    if (!question) {
      return next(errorHandler(404, 'Question not found'));
    }

    if (question.userId !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to update this question'));
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.questionId,
      {
        $set: {
          title: req.body.title,
          problemDetails: req.body.problemDetails,
          triedDetails: req.body.triedDetails,
          tags: req.body.tags,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedQuestion);
  } catch (error) {
    next(error);
  }
};

export const voteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.questionId);
    if (!question) {
      return next(errorHandler(404, 'Question not found'));
    }

    // Check if user has already voted
    if (question.votes.includes(req.user.id)) {
      return next(errorHandler(400, 'You have already voted on this question'));
    }

    // Add user's vote
    question.votes.push(req.user.id);
    question.votes++;

    await question.save();

    res.status(200).json(question);
  } catch (error) {
    next(error);
  }
};

export const viewQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.questionId);
    if (!question) {
      return next(errorHandler(404, 'Question not found'));
    }

    if (question.views.includes(req.body.userId)) {
      return next(errorHandler(400, 'You have already viewed this question'));
    }

    question.views.push(req.user.id);

    question.viewsCount = question.views.length;

    await question.save();

    res.status(200).json(question);
  } catch (error) {
    next(error);
  }
};

export const answerQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.questionId);
    if (!question) {
      return next(errorHandler(404, 'Question not found'));
    }

    // Check if user has already answered
    if (question.answers.find(answer => answer.userId === req.user.id)) {
      return next(errorHandler(400, 'You have already answered this question'));
    }

    // Add user's answer
    question.answers.push({ userId: req.user.id, content: req.body.content });

    await question.save();

    res.status(200).json(question);
  } catch (error) {
    next(error);
  }
};