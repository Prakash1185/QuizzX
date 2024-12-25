import QuizModel from "../../models/v1/quizModel.js";
import QuestionModel from "../../models/v1/questionModel.js";
import OptionsModel from "../../models/v1/optionsModel.js";
import UserModel from "../../models/v1/userModel.js";

// Create a quiz 
const createQuiz = async (req, res) => {
    const { title, description, bannerImage, questions, isActivated, questionTimeLimit } = req.body;

    if (!title || !description || !bannerImage ||
        !questionTimeLimit) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const quiz = new QuizModel({
            title,
            description,
            bannerImage,
            questions,
            isActivated,
            questionTimeLimit,
            // quizTimeLimit
        });
        await quiz.save();
        res.status(201).json({ message: "Quiz created", quiz, success: true });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server error", error: error.message, success: false });
    }
};


// add questions to a quiz
const createQuestion = async (req, res) => {
    const { question, option1, option2, option3, option4, correctOption } = req.body;
    const { quizId } = req.params;

    if (!question || !option1 || !option2 || !option3 || !option4 || !correctOption || !quizId) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Save options and get their ObjectIds
        const options = [option1, option2, option3, option4];
        const optionIds = await Promise.all(options.map(async (optionText) => {
            const option = new OptionsModel({ text: optionText, quizId });
            await option.save();
            return option._id;
        }));

        // Find the ObjectId of the correct option
        const correctOptionId = optionIds[correctOption - 1]; // Assuming correctOption is 1-based index

        // Create question with option ObjectIds and quizId
        const newQuestion = new QuestionModel({
            question,
            options: optionIds,
            correctOption: correctOptionId,
            quizId
        });
        await newQuestion.save();

        // Add the correct option ID to the quiz's correctOptions array
        await QuizModel.findByIdAndUpdate(quizId, { $push: { correctOptions: correctOptionId } });

        // Add the new question to the quiz's questions array
        await QuizModel.findByIdAndUpdate(quizId, { $push: { questions: newQuestion._id } });

        res.status(201).json({ message: "Question added", question: newQuestion, success: true });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server error", error: error.message, success: false });
    }
};

// get all the quizzes from the database for admin
const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await QuizModel.find();
        res.status(200).json({ quizzes, success: true });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server error", error: error.message, success: false });
    }
};

// get all the quizess and answers only with basic details like needed for user frontend
const getAllQuizzesForUser = async (req, res) => {
    try {
        const quizzes = await QuizModel.find({}, "title description bannerImage isEntryAllowed showLeaderboard");
        res.status(200).json({ quizzes, success: true });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server error", error: error.message, success: false });
    }
};

// get all the questions with their answers from the database for a particular quiz from quizId for  admin 
const getQuizQuestionsById = async (req, res) => {
    const { quizId } = req.params;


    try {
        const quiz = await QuizModel
            .findById(quizId)
            .populate({ path: "questions", populate: { path: "options" } });
        res.status(200).json({ quiz, success: true });
    }
    catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server error", error: error.message, success: false });
    }
};

// get all the questions with their options from the database for a particular quiz from quizId for  user 
const getQuizQuestionsByIdForUsers = async (req, res) => {
    const { quizId } = req.params;

    try {
        // Fetch quiz data with populated questions and options
        const quiz = await QuizModel
            .findById(quizId)
            .populate({
                path: "questions",
                select: "_id question options questionTimeLimit title",  // Only get the question ID, question text, and options
                populate: {
                    path: "options",
                    select: "_id text"  // Only get the option ID and option text
                }
            });

        // Prepare a simplified response with the desired data
        const simplifiedQuiz = {
            _id: quiz._id,
            questionTimeLimit: quiz.questionTimeLimit,
            title: quiz.title,
            questions: quiz.questions.map(question => ({
                _id: question._id,
                question: question.question,
                options: question.options.map(option => ({
                    _id: option._id,
                    text: option.text
                }))
            }))
        };

        // Respond with the simplified data
        res.status(200).json({ quiz: simplifiedQuiz, success: true });
    }
    catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server error", error: error.message, success: false });
    }
};

// get the question for a particular question with questionId  from the slug 
const getQuestionById = async (req, res) => {
    const { questionId } = req.params;

    try {
        const question = await QuestionModel
            .findById(questionId)
            .populate("options");

        if (!question) {
            return res.status(404).json({ message: "Question not found", success: false });
        }

        res.status(200).json({ question, success: true });
    }
    catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server error", error: error.message, success: false });
    }
}

// get the quiz for a particular question with quizId  from the slug
const getQuizById = async (req, res) => {
    const { quizId } = req.params;

    try {
        const quiz = await QuizModel
            .findById(quizId)
            .populate({ path: "questions", populate: { path: "options" } }).populate("correctOptions");
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found", success: false });
        }

        res.status(200).json({ quiz, success: true });
    }
    catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server error", error: error.message, success: false });
    }
}

// update the quiz details for admin
const updateQuiz = async (req, res) => {
    const { title, description, bannerImage, questions, isActivated, attendes, questionTimeLimit } = req.body;
    const { quizId } = req.params;

    // if (!title || !description || !bannerImage) {
    //     return res.status(400).json({ message: "All fields are required" });
    // }

    try {
        await QuizModel.findByIdAndUpdate(quizId, {
            title,
            description,
            bannerImage,
            questions,
            isActivated,
            attendes,
            // quizTimeLimit,
            questionTimeLimit
        });
        res.status(200).json({ message: "Quiz updated", success: true });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server error", error: error.message, success: false });
    }
};

// update the question details for admin for a particular question using questionId
const updateQuestion = async (req, res) => {
    const { question, option1, option2, option3, option4, correctOption } = req.body;
    const { quizId, questionId } = req.params;

    try {
        // Save options and get their ObjectIds
        const options = [option1, option2, option3, option4];
        const optionIds = await Promise.all(options.map(async (optionText) => {
            const option = new OptionsModel({ text: optionText, quizId });
            await option.save();
            return option._id;
        }));

        // Find the ObjectId of the correct option
        const correctOptionId = optionIds[correctOption - 1]; // Assuming correctOption is 1-based index

        // Update question with option ObjectIds and quizId
        await QuestionModel.findByIdAndUpdate(questionId, {
            question,
            options: optionIds,
            correctOption: correctOptionId,
            quizId
        });

        res.status(200).json({ message: "Question updated", success: true });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server error", error: error.message, success: false });
    }
};


// delete the quiz for admin with help of quizID
// const deleteQuiz = async (req, res) => {
//     const { quizId } = req.params;

//     try {
//         await QuizModel.findByIdAndDelete(quizId);
//         res.status(200).json({ message: "Quiz deleted", success: true });
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Server error", error: error.message, success: false });
//     }
// }

// const deleteQuiz = async (req, res) => {
//     const { quizId } = req.params;

//     try {
//         // Step 1: Delete questions associated with the quiz
//         await QuestionModel.deleteMany({ quizId });

//         // Step 2: Delete options associated with the quiz
//         await OptionsModel.deleteMany({ quizId });

//         // Step 3: Delete the quiz
//         await QuizModel.findByIdAndDelete(quizId);

//         res.status(200).json({ message: "Quiz and associated questions/options deleted", success: true });
//     } catch (error) {
//         // console.log(error);
//         res.status(500).json({ message: "Server error", error: error.message, success: false });
//     }
// }

const deleteQuiz = async (req, res) => {
    const { quizId } = req.params;

    try {
        await QuestionModel.deleteMany({ quizId });

        await OptionsModel.deleteMany({ quizId });

        await QuizModel.findByIdAndDelete(quizId);

        await UserModel.deleteMany({ quizzesAttempted: quizId });

        res.status(200).json({ message: "Quiz deleted", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message, success: false });
    }
};




// delete the question for admin with help of questionID
const deleteQuestion = async (req, res) => {
    const { questionId } = req.params;

    try {
        await QuestionModel.findByIdAndDelete(questionId);
        res.status(200).json({ message: "Question deleted", success: true });
    }
    catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server error", error: error.message, success: false });
    }
}

// update isActive status of the quiz
// const updateQuizStatus = async (req, res) => {
//     const { quizId } = req.params;
//     const { isActivated } = req.body;

//     try {
//         await QuizModel.findByIdAndUpdate(quizId, { isActivated }, { new: true });
//         res.status(200).json({ message: "Quiz status updated", success: true });
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Server error", error: error.message, success: false });
//     }
// }

// update isEntryAllowed status of the quiz
const updateIsEntryStatus = async (req, res) => {
    const { quizId } = req.params;
    const { isEntryAllowed } = req.body;

    // console.log("Quiz ID:", quizId);
    // console.log("Request Body:", req.body);

    try {
        await QuizModel.findByIdAndUpdate(quizId, { isEntryAllowed }, { new: true });
        res.status(200).json({ message: "Quiz status updated", success: true });
    }
    catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server error", error: error.message, success: false });
    }
}

// update showLeaderboard status of the quiz
const updateShowLeaderboardStatus = async (req, res) => {
    const { quizId } = req.params;
    const { showLeaderboard } = req.body;

    try {
        await QuizModel.findByIdAndUpdate(quizId, { showLeaderboard }, { new: true });
        res.status(200).json({ message: "Leaderboard status updated", success: true });
    }
    catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server error", error: error.message, success: false });
    }
}

// function to get isEntryAllowed status of the quiz using quizId
const getQuizStatus = async (req, res) => {
    const { quizId } = req.params;

    try {
        const quiz = await QuizModel.findById(quizId);
        res.status(200).json({ isEntryAllowed: quiz.isEntryAllowed, success: true });
    }
    catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server error", error: error.message, success: false });
    }
}

// exporting all the functions
export { createQuiz, createQuestion, getAllQuizzes, getAllQuizzesForUser, getQuizQuestionsById, getQuestionById, getQuizById, updateQuiz, updateQuestion, deleteQuiz, deleteQuestion, updateIsEntryStatus, updateShowLeaderboardStatus, getQuizQuestionsByIdForUsers, getQuizStatus };
