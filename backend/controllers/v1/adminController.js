import dotenv from 'dotenv';
import AdminModel from "../../models/v1/adminModel.js";
import jwt from "jsonwebtoken";

dotenv.config();

//! admin register not needed for registering admin as it is done by another method
// function to register admin using email,password and secret key for admin
const adminRegister = async (req, res) => {
    const { email, password, secretKey } = req.body;
    // check all entries are filled
    if (!email || !password || !secretKey) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const admin = await AdminModel.create({ email, password, secretKey });
        return res.status(201).json({ success: true, admin, message: "Admin registered successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message, success: false, message: "Something went wrong !" });
    }
}


// function to login admin using email,password and secret key and then generate a jwt token for admin
const adminLogin = async (req, res) => {
    const { email, password, secretKey } = req.body;

    try {
        // Check if the entered credentials match the environment variables
        if (
            email !== process.env.ADMIN_EMAIL ||
            password !== process.env.ADMIN_PASSWORD ||
            secretKey !== process.env.SECRET_KEY
        ) {
            return res.status(400).json({ message: "Invalid credentials", success: false });
        }

        // Generate a token
        // const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const token = jwt.sign(
            { id: process.env.ADMIN_ID, isAdmin: process.env.IS_ADMIN },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.cookie('token', token, { httpOnly: true, secure: true });

        return res.status(200).json({ token, success: true, message: "Admin logged in successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong!", success: false, error: error.message });
    }
};

// exporting all functions
export { adminRegister, adminLogin };