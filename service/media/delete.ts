import fs from 'fs/promises';
import path from 'path';

import {config} from '../../config';
import {AppError} from '../../utils';
import {HttpStatus} from '../../constants/httpStatus';
import type {Image} from '../../types/entities/image';

export const deleteImage = async(id: string, ext: Express.Request['ext']): Promise<void> => {
  const image = await ext.db<Image>('Image')
    .where({id})
    .first();

  if (!image) {
    throw new AppError('Image not found', HttpStatus.NOT_FOUND);
  }

  const filePath = path.join(config.uploadsDir, image.filename);

  try {
    await fs.unlink(filePath);
  } catch (error) {
    const err = error as NodeJS.ErrnoException;

    if (err.code !== 'ENOENT') {
      ext.logger.error?.(`Failed to delete image file ${filePath}: ${err.message}`);
    }
  }

  await ext.db<Image>('Image')
    .where({id})
    .delete();
};