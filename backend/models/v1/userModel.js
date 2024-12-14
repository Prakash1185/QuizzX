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
    quizzAtempted: {
        type: Number,
        default: 0
    },
    score: {
        type: Number,
        default: 0
    },
    optionsSelected: {
        type: Array,
        default: ["No options selected"]
    },
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;