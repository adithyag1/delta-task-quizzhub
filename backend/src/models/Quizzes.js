import mongoose from 'mongoose';

const QuizzSchema = new mongoose.Schema({
  quizName: {
    type: String,
    required: true
  },
  quiz: [
    {
      questionNo: Number,
      question: String,
      options: [
        {
          optionNumber: Number,
          option: String
        }
      ],
      correctOption: Number
    }
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  noOfQuestions: {
    type: Number,
    required: true
  }
});

const QuizzModel = mongoose.model("quizzes", QuizzSchema);
export default QuizzModel;

