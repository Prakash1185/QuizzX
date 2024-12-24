import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    time: {
        type: String,
        default: new Date().toLocaleTimeString()
    },
    quizzesAttempted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
    }],
    score: {
        type: Number,
        default: 0
    },
    optionsSelected: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option'
    }],
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;