import {Request, Response, NextFunction} from 'express';
import multer from 'multer';
import path from 'path';

import db from '#db';
import {config} from '#config';
import {MAX_FILE_SIZE_BYTES, RANDOM_SUFFIX_LIMIT} from '#constants/upload';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, config.uploadsDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * RANDOM_SUFFIX_LIMIT)}`;
    const ext = path.extname(file.originalname);
    const filename = `image-${uniqueSuffix}${ext}`;

    cb(null, filename);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE_BYTES
  },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (JPEG, PNG, WebP, GIF)'));
    }
  }
});

const injectExtensions = (req: Request, res: Response, next: NextFunction) => {
  req.ext = {
    db,
    logger: console,
    upload
  };

  next();
};

export default injectExtensions;