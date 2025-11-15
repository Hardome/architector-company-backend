import {Request, Response} from 'express';

import {BaseController} from './BaseController';
import {createImage, deleteImage as deleteImageService} from '../service/media';
import type {ImageUploadBody, ImageIdParams} from '../validators/media';

class MediaController extends BaseController {
  async upload(req: Request, res: Response): Promise<void> {
    const body = (req.body ?? {}) as ImageUploadBody;

    const image = await createImage(body, req.file, req.ext);

    this.created(res, image, 'Image uploaded successfully');
  }

  async delete(req: Request, res: Response): Promise<void> {
    const {id} = req.params as ImageIdParams;

    await deleteImageService(id, req.ext);

    this.success(res, null, 'Image deleted successfully');
  }
}

export default new MediaController();