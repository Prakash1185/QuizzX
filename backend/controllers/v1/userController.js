import UserModel from '../../models/v1/userModel.js';
import QuizModel from '../../models/v1/quizModel.js';
import jwt from 'jsonwebtoken';

// code to generate random suffix
export const generateRandomSuffix = (length = 3) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let suffix = '';
    for (let i = 0; i < length; i++) {
        suffix += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return suffix;
}

// create account
export const createAccount = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ success: false, message: "Name is required" });
    }

    try {
        let uniqueName = name
        let isUnique = false;

        // ensuring unique name by adding random suffix if name already exists
        while (!isUnique) {
            const existingUser = await UserModel.findOne({ name: uniqueName });

            if (!existingUser) {
                isUnique = true;
            } else {
                uniqueName = `${name}-${generateRandomSuffix()}`;
            }
        }

        // adding suffix to every name that entered 
        // uniqueName = `${name}-${generateRandomSuffix()}`;

        // creating user
        const user = new UserModel({
            name: uniqueName
        });
        await user.save();

        // generating jwt tokens
        const token = jwt.sign({
            id: user._id,
            name: user.name
        }, process.env.JWT_SECRET,
            { expiresIn: '2h' });

        // returning username and ID along with token
        res.status(201).json({
            success: true,
            message: "User created",
            user: {
                id: user._id,
                name: user.name,
            },
            token

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }

};

// get all users
export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

//  get the user details by the userId
export const getUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// update user by ID
export const updateUserById = async (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ success: false, message: "Name is required" });
    }

    try {
        const user = await UserModel.findById(userId);
        user.name = name;
        await user.save();

        res.status(200).json({ success: true, message: "User updated", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// delete user by ID
export const deleteUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        await UserModel.findByIdAndDelete(userId);
        res.status(200).json({ success: true, message: "User deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// function to store all the selected options by the user in the array in optionsSelected field in the user model also add the quizId in the quizzAtempted field
export const storeSelectedOptions = async (req, res) => {
    const { userId, optionsSelected } = req.body;
    const { quizId } = req.params;

    if (!quizId || !userId || !optionsSelected) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const user = await UserModel.findById(userId);
        user.optionsSelected.push({ quizId, optionsSelected });
        // user.quizzAtempted += 1;
        await user.save();

        res.status(200).json({ success: true, message: "Options selected", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// update the score of the user in score field in the user model
export const updateScore = async (req, res) => {
    const { userId } = req.params;
    const { score } = req.body;
    // const { userId,score } = req.body;

    if (!userId || !score) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const user = await UserModel.findById(userId);
        user.score = score;
        await user.save();

        res.status(200).json({ success: true, message: "Score updated", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Function to calculate the score of the user by running a loop over selectedoptions and correctoptions of the quiz model 
export const calculateScore = async (req, res) => {
    const { userId, quizId } = req.params;
    try {
        const user = await UserModel.findById(userId).populate('optionsSelected');
        const quiz = await QuizModel.findById(quizId).populate('correctOptions');
        if (!user || !quiz) {
            return res.status(404).json({ success: false, message: "Something went wrong !" });
        }
        const correctOptions = quiz.correctOptions.map(option => option.toString());
        const selectedOptions = user.optionsSelected.map(option => option._id.toString());
        let score = 0;
        selectedOptions.forEach(option => {
            if (correctOptions.includes(option)) {
                score += 1;
            }
        });
        user.score = score;
        await user.save();
        res.status(200).json({ success: true, message: "Score calculated", score });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


// get the score of the user 
export const getScore = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await UserModel.findById(userId);
        res.status(200).json({ success: true, score: user.score });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// add the quizId in the quizzAtempted field in the user model
export const addQuizAttempted = async (req, res) => {
    const { quizId } = req.params;
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const user = await UserModel.findById(userId);
        user.quizzesAttempted.push(quizId);
        await user.save();

        res.status(200).json({ success: true, message: "Quiz added", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

//  get users with thier score in descending order in a particular quiz using quizId fron slug
export const getLeaderboard = async (req, res) => {
    const { quizId } = req.params;

    try {
        const users = await UserModel.find({ quizzAtempted: quizId }).sort({ score: -1 });
        res.status(200).json({ success: true, users });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}
