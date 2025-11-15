import {Router as createRouter} from 'express';

import {createSchema, deleteSchema, editSchema} from '#validators/projects';
import {ProjectsController} from '#controllers';
import {validateRequest, asyncHandler} from '#middlewares';

const router = createRouter();

// router.get('/', asyncHandler(listProjects));
// router.post('/', validateRequest(projectSchema), asyncHandler(createProject));
// router.put('/:id', validateRequest(projectSchema), asyncHandler(updateProject));
router.post('/', validateRequest(createSchema), asyncHandler(ProjectsController.create));
router.patch('/', validateRequest(editSchema), asyncHandler(ProjectsController.update));
router.delete('/', validateRequest(deleteSchema), asyncHandler(ProjectsController.delete));

export default router;