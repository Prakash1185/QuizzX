import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    secretKey: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    time: {
        type: String,
        default: new Date().toLocaleTimeString(),
    }
});

const AdminModel = mongoose.model('Admin', adminSchema);

export default AdminModel;