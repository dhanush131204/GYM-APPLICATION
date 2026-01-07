import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './src/config/database.js';
import { errorHandler } from './src/middleware/errorHandler.js';

// Routes
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import workoutRoutes from './src/routes/workoutRoutes.js';
import dietRoutes from './src/routes/dietRoutes.js';
import chatbotRoutes from './src/routes/chatbotRoutes.js';
import trainerRoutes from './src/routes/trainerRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import communityRoutes from './src/routes/communityRoutes.js';
import gamificationRoutes from './src/routes/gamificationRoutes.js';
import exerciseRoutes from './src/routes/exerciseRoutes.js';
import paymentRoutes from './src/routes/paymentRoutes.js';

// 🔗 Connect to MongoDB
connectDB();

// Seed a default premium plan if none exist
import MembershipPlan from './src/models/MembershipPlan.js';

(async () => {
  try {
    const count = await MembershipPlan.countDocuments();
    if (count === 0) {
      console.log('Seeding default membership plan...');
      await MembershipPlan.create({
        name: 'Premium',
        price: 29.99,
        duration: 1, // month
        features: [
          'Personalized workout plans',
          'Custom diet plans',
          'Priority trainer access',
          'Progress tracking & reports',
        ],
        isActive: true,
      });
      console.log('Default Premium plan created.');
    }
  } catch (err) {
    console.error('Error seeding membership plans:', err.message || err);
  }
})();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173',
  'https://elegant-taiyaki-3a2f3c.netlify.app'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// Enable pre-flight requests for all routes
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/diets', dietRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/trainer', trainerRoutes); // Registered Trainer Routes
app.use('/api/admin', adminRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/gamification', gamificationRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/payments', paymentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'GYMVERSE API is running',
    time: new Date().toISOString(),
  });
});

// Error handler (MUST be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
// Server is ready
