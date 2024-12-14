import jwt from 'jsonwebtoken';
// checkAuthenticated middleware code 

const checkAuthenticated = (req, res, next) => {
    const auth = req.headers["authorization"];
    if (!auth) {
        return res.status(403).json({
            message: "Unauthorized access denied",
            success: false,
        });
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

export default checkAuthenticated ;