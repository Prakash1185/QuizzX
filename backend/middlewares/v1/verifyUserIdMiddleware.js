const verifyUserId = (req, res, next) => {
    const { userId } = req.body;

    if (req.user.id !== userId) {
        return res.status(403).json({ success: false, message: 'Unauthorized access denied!' });
    }

    next();
};

export default verifyUserId;