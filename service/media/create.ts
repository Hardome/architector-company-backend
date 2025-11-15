import {AppError} from '../../utils';
import {HttpStatus} from '../../constants/httpStatus';
import type {ImageUploadBody} from '../../validators/media';
import type {Image} from '../../types/entities/image';

export const createImage = async(
  body: ImageUploadBody,
  file: Express.Multer.File | undefined,
  ext: Express.Request['ext']
): Promise<Image> => {
  if (!file) {
    throw new AppError('No file uploaded', HttpStatus.BAD_REQUEST);
  }

  const payload = {
    url: `/uploads/${file.filename}`,
    filename: file.filename,
    size: file.size,
    projectId: body.projectId ?? null
  };

  const [image] = await ext.db<Image>('Image')
    .insert(payload)
    .returning(['id', 'url', 'filename', 'size', 'projectId']);

  if (!image) {
    throw new AppError('Failed to save image metadata', HttpStatus.INTERNAL_ERROR);
  }

  return image;
};

