import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import {PrismaClient} from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';

// Загружаем .env из корня бэкенда
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;
const UPLOAD_DIR = process.env.UPLOAD_DIR ? path.resolve(process.env.UPLOAD_DIR) : path.join(__dirname, '../uploads');

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json());

app.use('/uploads', express.static(UPLOAD_DIR));

// app.use('/api/auth', require('./routes/auth').default);
app.use('/api/projects', require('./routes/projects').default);
app.use('/api/upload', require('./routes/upload').default);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend server running on port ${PORT}`);
  // eslint-disable-next-line no-console
  console.log(`Uploads directory: ${UPLOAD_DIR}`);
});