// backend/src/routes/upload.ts
import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// POST /api/upload - загрузить изображение
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const image = await prisma.image.create({
      data: {
        url: `/uploads/${req.file.filename}`,
        filename: req.file.filename,
        size: req.file.size,
        projectId: req.body.projectId // опционально
      }
    });

    res.json({
      success: true,
      image: {
        id: image.id,
        url: image.url,
        filename: image.filename
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

export default router;