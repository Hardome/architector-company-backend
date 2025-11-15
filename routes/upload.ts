import {Router as createRouter} from 'express';
import {MediaController} from '#controllers';
import {asyncHandler, validateRequest, validateParams} from '#middlewares';
import {uploadSchema, imageIdSchema} from '#validators/media';

const router = createRouter();

router.post(
  '/',
  validateRequest(uploadSchema),
  asyncHandler(MediaController.upload)
);
router.delete(
  '/:id',
  validateParams(imageIdSchema),
  asyncHandler(MediaController.delete)
);

export default router;