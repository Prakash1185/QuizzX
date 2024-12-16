import jwt from 'jsonwebtoken';
import UserModel from '../../models/v1/userModel.js';

const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ success: false, message: 'Unauthorized access denied!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.id);

        if (!user || user.name !== decoded.name) {
            return res.status(403).json({ success: false, message: 'Unauthorized access denied!' });
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong!', error: error.message });
    }
};

export default authMiddleware;