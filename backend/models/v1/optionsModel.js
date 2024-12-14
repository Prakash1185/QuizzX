import mongoose from 'mongoose';

const optionsSchema = new mongoose.Schema({
    text: {
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
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    }
});

const OptionsModel = mongoose.model("Option", optionsSchema);
export default OptionsModel;