import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    bannerImage: {
        type: String,
        required: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    correctOptions: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option'
    },
    date: {
        type: Date,
        default: Date.now
    },
    time: {
        type: String,
        default: new Date().toLocaleTimeString()
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    attendes: {
        type: Array,
        default: ["No attendes"]
    },
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;