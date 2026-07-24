import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

import authRoutes from './routes/authRoutes';
import propertyRoutes from './routes/propertyRoutes';
import draftRoutes from './routes/draftRoutes';
import locationRoutes from './routes/locationRoutes';
import mediaRoutes from './routes/mediaRoutes';
import aiRoutes from './routes/aiRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/drafts', draftRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/ai', aiRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Magicbricks AI Property Posting Backend Running' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`[Server] Server listening on http://localhost:${PORT}`);
});
