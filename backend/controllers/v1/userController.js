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
    const { quizId } = req.params;

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
            name: uniqueName,
            quizzesAttempted: [quizId]
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
            id: user._id,
            name: user.name,
            token

        });

    } catch (error) {
        // console.log(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }

};

// get all users
export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({ success: true, users });
    } catch (error) {
        // console.log(error);
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
        // console.log(error);
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
        // console.log(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// delete user by ID
// export const deleteUserById = async (req, res) => {
//     const { userId } = req.params;

//     try {
//         await UserModel.findByIdAndDelete(userId);
//         res.status(200).json({ success: true, message: "User deleted" });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ success: false, message: "Server error", error: error.message });
//     }
// };


// Delete user by ID
export const deleteUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the user to ensure they exist before deletion
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Remove the userId from the attendes array of all quizzes
        await QuizModel.updateMany(
            { attendes: userId },
            { $pull: { attendes: userId } }
        );

        // Delete the user
        await UserModel.findByIdAndDelete(userId);

        res.status(200).json({ success: true, message: "User deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


// function to store all the selected options by the user in the array in optionsSelected field in the user model also add the quizId in the quizzAtempted field
// export const storeSelectedOptions = async (req, res) => {
//     const { userId, optionsSelected } = req.body;
//     const { quizId } = req.params;

//     if (!quizId || !userId || !optionsSelected) {
//         return res.status(400).json({ success: false, message: "All fields are required" });
//     }

//     try {
//         const user = await UserModel.findById(userId);
//         user.optionsSelected.push({ quizId, optionsSelected });
//         // user.quizzAtempted += 1;
//         await user.save();

//         res.status(200).json({ success: true, message: "Options selected", user });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ success: false, message: "Server error", error: error.message });
//     }
// };

export const storeSelectedOptions = async (req, res) => {
    const { userId, optionsSelected } = req.body;
    const { quizId } = req.params;

    if (!quizId || !userId || !Array.isArray(optionsSelected)) {
        return res.status(400).json({ success: false, message: "Invalid input data" });
    }

    try {
        const user = await UserModel.findById(userId);

        // Add quizId to quizzesAttempted
        if (!user.quizzesAttempted.includes(quizId)) {
            user.quizzesAttempted.push(quizId);
        }

        // Add selected options
        user.optionsSelected = [...user.optionsSelected, ...optionsSelected];

        await user.save();

        res.status(200).json({ success: true, message: "Options saved successfully", user });
    } catch (error) {
        console.error('Error saving options:', error);
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
        // console.log(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Function to calculate the score of the user by running a loop over selectedoptions and correctoptions of the quiz model 

// export const calculateScore = async (req, res) => {
//     const { userId, quizId } = req.params;
//     try {
//         const user = await UserModel.findById(userId).populate('optionsSelected');
//         const quiz = await QuizModel.findById(quizId).populate('correctOptions');
//         if (!user || !quiz) {
//             return res.status(404).json({ success: false, message: "Something went wrong !" });
//         }
//         const correctOptions = quiz.correctOptions.map(option => option.toString());
//         const selectedOptions = user.optionsSelected.map(option => option._id.toString());
//         let score = 0;
//         selectedOptions.forEach(option => {
//             if (correctOptions.includes(option)) {
//                 score += 1;
//             }
//         });
//         user.score = score;
//         await user.save();
//         res.status(200).json({ success: true, message: "Score calculated", score });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ success: false, message: "Server error", error: error.message });
//     }
// };



// export const    calculateScore = async (req, res) => {
//     const { quizId } = req.params;
//     const { userId } = req.body;

//     try {
//         const user = await UserModel.findById(userId);
//         if (!user) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }

//         const quiz = await QuizModel.findById(quizId).populate('questions');
//         if (!quiz) {
//             return res.status(404).json({ success: false, message: 'Quiz not found' });
//         }

//         let score = 0;
//         user.optionsSelected.forEach((selectedOption) => {
//             quiz.questions.forEach((question) => {
//                 if (question.correctOption && question.correctOption.toString() === selectedOption.toString()) {
//                     score += question.points || 0; // Assuming each question has a points field
//                 }
//             });
//         });

//         // Ensure score is a valid number
//         if (isNaN(score)) {
//             score = 0;
//         }

//         user.score = score;
//         await user.save();

//         console.log(user.optionsSelected);
//         console.log(quiz.correctOptios)

//         res.status(200).json({ success: true, score: user.score });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Server error', error: error.message });
//     }
// };


export const calculateScore = async (req, res) => {
    const { quizId } = req.params;
    const { userId } = req.body;

    try {
        // Fetch the user from the database
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Fetch the quiz and populate the necessary fields
        const quiz = await QuizModel.findById(quizId).populate('correctOptions');
        if (!quiz) {
            return res.status(404).json({ success: false, message: 'Quiz not found' });
        }

        let score = 0;

        // Loop through the selected options of the user and compare with correct options
        user.optionsSelected.forEach((selectedOption, index) => {
            // Check if the selected option matches the correct option
            const isCorrect = quiz.correctOptions.some(correctOption => correctOption._id.equals(selectedOption._id));

            if (isCorrect) {
                score += 10; // You can adjust the score logic as per your requirement
            }
        });

        // Ensure score is a valid number
        if (isNaN(score)) {
            score = 0;
        }

        // Update user's score
        user.score = score;
        await user.save();

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// get the score of the user 
export const getScore = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await UserModel.findById(userId);
        res.status(200).json({ success: true, score: user.score });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

    } catch (error) {
        // console.log(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// add the quizId in the quizzAtempted field in the user model
// export const addQuizAttempted = async (req, res) => {
//     const { quizId } = req.params;
//     const { userId } = req.body;

//     if (!userId) {
//         return res.status(400).json({ success: false, message: "All fields are required" });
//     }

//     try {
//         const quiz = await QuizModel.findById(quizId);
//         const user = await UserModel.findById(userId);
//         quiz.attendes.push(userId);
//         user.quizzesAttempted.push(quizId);
//         await quiz.save();
//         await user.save();

//         res.status(200).json({ success: true, message: "Quiz added", user });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ success: false, message: "Server error", error: error.message });
//     }
// };

export const addQuizAttempted = async (req, res) => {
    const { quizId } = req.params;
    const { userId } = req.body;

    if (!quizId || !userId) {
        return res.status(400).json({ success: false, message: "Both quizId and userId are required" });
    }

    try {
        const quiz = await QuizModel.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ success: false, message: 'Quiz not found' });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Add the quizId to the quizzesAttempted array if not already present
        if (!user.quizzesAttempted.includes(quizId)) {
            user.quizzesAttempted.push(quizId);
        }

        // Remove null values from the quizzesAttempted array
        user.quizzesAttempted = user.quizzesAttempted.filter(id => id !== null);

        await user.save();

        res.status(200).json({ success: true, message: "Quiz added", user });
    } catch (error) {
        console.error(error);
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
        // console.log(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

// Delete all users

export const deleteAllUsers = async (req, res) => {
    try {
        // Step 1: Remove all user IDs from the attendes array of all quizzes
        await QuizModel.updateMany({}, { $set: { attendes: [] } });

        // Step 2: Proceed to delete all users
        await UserModel.deleteMany({});

        res.status(200).json({ success: true, message: "All users and their references in quizzes deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// export const addUserToAttendes = async (req, res) => {
//     const { quizId } = req.params;
//     const { userId } = req.body;

//     try {
//         // Find the quiz by ID
//         const quiz = await QuizModel.findById(quizId);
//         if (!quiz) {
//             return res.status(404).json({ success: false, message: 'Quiz not found' });
//         }

//         // Add the user ID to the attendes array if not already present
//         if (!quiz.attendes.includes(userId)) {
//             quiz.attendes.push(userId);
//             await quiz.save();
//         }

//         res.status(200).json({ success: true, message: 'User added to attendes', attendes: quiz.attendes });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Server error', error: error.message });
//     }
// };

export const addUserToAttendes = async (req, res) => {
    const { quizId } = req.params;
    const { userId } = req.body;

    if (!quizId || !userId) {
        return res.status(400).json({ success: false, message: "Both quizId and userId are required" });
    }

    try {
        // Validate the quiz ID
        const quiz = await QuizModel.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ success: false, message: "Quiz not found" });
        }

        // Avoid duplicate entries
        if (!quiz.attendes.includes(userId)) {
            quiz.attendes.push(userId);
            await quiz.save();
        }

        res.status(200).json({ success: true, message: "User added to attendes", attendes: quiz.attendes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};



// function to get all the users from attendee of the quiz with their name and score and id only
export const getAttendes = async (req, res) => {
    const { quizId } = req.params;

    try {
        const quiz = await QuizModel.findById(quizId).populate('attendes');
        if (!quiz) {
            return res.status(404).json({ success: false, message: 'Quiz not found' });
        }

        // Extract only the required fields from the users
        const attendes = quiz.attendes.map(user => ({
            id: user._id,
            name: user.name,
            score: user.score
        }));

        res.status(200).json({ success: true, attendes });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }

}

//function to get all the users from attendee of the quiz 
export const getAttendesDetails = async (req, res) => {
    const { quizId } = req.params;

    try {
        const quiz = await QuizModel.findOne({ _id: quizId }).populate('attendes');
        if (!quiz) {
            return res.status(404).json({ success: false, message: 'Quiz not found' });
        }

        // Sort attendes array by score in descending order
        const sortedAttendes = quiz.attendes.sort((a, b) => b.score - a.score);

        res.status(200).json({ success: true, attendes: sortedAttendes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// Function to get all users who have the specified quizId in their quizzesAttempted field
export const getUsersByQuizId = async (req, res) => {
    const { quizId } = req.params;
    // console.log(quizId);

    try {
        const users = await UserModel.find({ quizzesAttempted: quizId }).select('name score _id').sort({ score: -1 });
        if (!users.length) {
            return res.status(404).json({ success: false, message: 'No users found' });
        }
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};


// Controller to delete all users who have attempted a specific quiz
export const deleteAllUsersByQuizId = async (req, res) => {
    const { quizId } = req.params;

    if (!quizId) {
        return res.status(400).json({
            success: false,
            message: "Quiz ID is required.",
        });
    }

    try {
        // Step 1: Remove all user IDs from the attendes array of the quiz
        await QuizModel.updateOne(
            { _id: quizId },
            { $set: { attendes: [] } }
        );

        // Step 2: Delete all users who have attempted the quiz
        const result = await UserModel.deleteMany({ quizzesAttempted: quizId });

        return res.status(200).json({
            success: true,
            message: `${result.deletedCount} attendees deleted successfully.`,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting attendees.",
            error: error.message,
        });
    }
};
