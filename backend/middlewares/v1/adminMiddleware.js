import jwt from 'jsonwebtoken';

// const adminMiddleware = (req, res, next) => {
//     const token = req.headers['authorization'];
//     const isAdmin = req.headers['isadmin'];

//     if (!token) {
//         return res.status(403).json({ success: false, message: 'Warning : Unauthorized access denied' });
//     }

//     if (!isAdmin || isAdmin !== 'true') {
//         return res.status(403).json({ success: false, message: 'Warning : Unauthorized access denied' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         return res.status(500).json({ success: false, message: 'Something went wrong !' });
//     }
// };

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
        return res.status(401).json({ success: false, message: 'Something went wrong !' });
    }
};


export { adminMiddleware };