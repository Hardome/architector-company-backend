import {AppError} from '../../utils';
import {HttpStatus} from '../../constants/httpStatus';
import type {ProjectEditInput} from '../../validators/projects';
import type {Project} from '../../types/entities/project';

export const update = async(
  projects: ProjectEditInput[],
  ext: Express.Request['ext']
): Promise<Project[]> => {
  if (!projects.length) {
    throw new AppError('No projects to edit', HttpStatus.BAD_REQUEST);
  }

  const promises = projects.map((project) => ext.db<Project>('projects')
    .where({id: project.id})
    .update(project)
    .returning('*'));

  const updatedProjects = await Promise.all(promises);

  return updatedProjects.flat();
};