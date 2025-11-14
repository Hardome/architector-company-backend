import {Router} from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {PrismaClient} from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

const uploadsEnvPath = process.env.UPLOAD_DIR ? path.resolve(process.env.UPLOAD_DIR) : undefined;
const UPLOADS_DIR = uploadsEnvPath ?? path.join(__dirname, '../../uploads');

// Создаем папку uploads если нет
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, {recursive: true});
  console.log('Created uploads directory:', UPLOADS_DIR);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    const filename = `image-${uniqueSuffix}${ext}`;

    cb(null, filename);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (JPEG, PNG, WebP, GIF)'));
    }
  }
});

// POST /api/upload
router.post('/', upload.single('image'), async(req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({error: 'No file uploaded'});
    }

    const image = await prisma.image.create({
      data: {
        url: `/uploads/${req.file.filename}`,
        filename: req.file.filename,
        size: req.file.size,
        projectId: req.body.projectId || null
      }
    });

    res.json({
      success: true,
      image: {
        id: image.id,
        url: image.url,
        filename: image.filename,
        size: image.size
      }
    });
  } catch(error) {
    console.error('Upload error:', error);
    res.status(500).json({error: 'Upload failed'});
  }
});

// DELETE /api/upload/:id
router.delete('/:id', async(req, res) => {
  try {
    const {id} = req.params;

    const image = await prisma.image.findUnique({
      where: {id}
    });

    if (!image) {
      return res.status(404).json({error: 'Image not found'});
    }

    const filePath = path.join(UPLOADS_DIR, image.filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Удаляем запись из базы
    await prisma.image.delete({
      where: {id}
    });

    res.json({success: true, message: 'Image deleted'});
  } catch(error) {
    console.error('Delete image error:', error);
    res.status(500).json({error: 'Delete failed'});
  }
});

export default router;