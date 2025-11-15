import {Request, Response} from 'express';

import {BaseController} from './BaseController';
import {create, deleteProjects, update} from '../service/projects';

class ProjectsController extends BaseController {
  async create(req: Request, res: Response): Promise<void> {
    const projects = await create(req.body, req.ext);

    this.created(res, projects, 'Projects created successfully');
  }

  async update(req: Request, res: Response): Promise<void> {
    const projects = await update(req.body, req.ext);

    this.success(res, projects, 'Projects updated successfully');
  }

  async delete(req: Request, res: Response): Promise<void> {
    await deleteProjects(req.body, req.ext);

    this.success(res, null, 'Projects deleted successfully');
  }
}

export default new ProjectsController();