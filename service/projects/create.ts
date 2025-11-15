import {AppError} from '../../utils';
import {HttpStatus} from '../../constants/httpStatus';
import type {ProjectCreateInput} from '../../validators/projects';
import type {Project} from '../../types/entities/project';

export const create = async(
  projects: ProjectCreateInput[],
  ext: Express.Request['ext']
): Promise<Project[]> => {
  if (!projects.length) {
    throw new AppError('No projects to create', HttpStatus.BAD_REQUEST);
  }

  const createdProjects = await ext.db<Project>('projects')
    .insert(projects)
    .returning('*');

  return createdProjects;
};