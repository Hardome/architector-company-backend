import {Router as createRouter, Router} from 'express';

import {createSchema, deleteSchema, editSchema} from '../validators/projects';
import {ProjectsController} from '../controllers';
import {validateRequest, asyncHandler} from '../middlewares';

const router: Router = createRouter();

// router.get('/', asyncHandler(listProjects));
// router.post('/', validateRequest(projectSchema), asyncHandler(createProject));
// router.put('/:id', validateRequest(projectSchema), asyncHandler(updateProject));
router.post(
  '/',
  validateRequest(createSchema),
  asyncHandler(ProjectsController.create.bind(ProjectsController))
);
router.patch(
  '/',
  validateRequest(editSchema),
  asyncHandler(ProjectsController.update.bind(ProjectsController))
);
router.delete(
  '/',
  validateRequest(deleteSchema),
  asyncHandler(ProjectsController.delete.bind(ProjectsController))
);

export default router;