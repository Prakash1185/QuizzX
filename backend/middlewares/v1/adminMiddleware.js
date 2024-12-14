import jwt from 'jsonwebtoken';

// Middleware to check if user is an admin
const adminMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ success: false, message: 'Unauthorized access denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if user is an admin
        if (!decoded.isAdmin) {
            return res.status(403).json({ success: false, message: 'Unauthorized access denied' });
        }

        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Something went wrong !',error:error.message });
    }
};


export default adminMiddleware ;