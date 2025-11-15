import {Router as createRouter, Router} from 'express';
import {MediaController} from '../controllers';
import {asyncHandler, validateRequest, validateParams} from '../middlewares';
import {uploadSchema, imageIdSchema} from '../validators/media';

const router: Router = createRouter();

router.post(
  '/',
  validateRequest(uploadSchema),
  asyncHandler(MediaController.upload.bind(MediaController))
);
router.delete(
  '/:id',
  validateParams(imageIdSchema),
  asyncHandler(MediaController.delete.bind(MediaController))
);

export default router;