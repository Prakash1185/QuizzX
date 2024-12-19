import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './db/v1/db.js';
import userRoutes from './routes/v1/userRoutes.js';
import quizRoutes from './routes/v1/quizRoutes.js';
import adminRoutes from './routes/v1/adminRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// setting up cors for specific urls
const corsOptions = {
  origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  // optionSuccessStatus: 200,
};

// USING MIDDLEWARES
app.use(cors());
app.use(express.json());

// ROUTES
// testing the server
app.get('/ping', (req, res) => {
  res.send('pong');
});
// real routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/quiz', quizRoutes);
app.use('/api/v1/admin', adminRoutes);

// RUNNING THE SERVER
const MONGO_URI = process.env.MONGO_URI;
connectDB(MONGO_URI).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});