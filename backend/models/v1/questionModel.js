import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    options: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option',
        required: true
    }],
    correctOption: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option',
        required: true,
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    time: {
        type: String,
        default: new Date().toLocaleTimeString()
    }
});

const QuestionModel = mongoose.model('Question', questionSchema);
export default QuestionModel;