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
    correctOptions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option'
    }],
    date: {
        type: Date,
        default: Date.now
    },
    time: {
        type: String,
        default: new Date().toLocaleTimeString()
    },
    // isActivated: {
    //     type: Boolean,
    //     default: false
    // },
    isEntryAllowed: {
        type: Boolean,
        default: false
    },
    showLeaderboard: {
        type: Boolean,
        default: false
    },
    attendes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    questionTimeLimit: {
        type: Number,
        required: true
    },
    // quizTimeLimit: {
    //     type: Number,
    //     required: true
    // }
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;