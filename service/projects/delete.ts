import {AppError} from '../../utils';
import {HttpStatus} from '../../constants/httpStatus';
import type {ProjectDeleteInput} from '../../validators/projects';
import type {Project} from '../../types/entities/project';

export const deleteProjects = async(
  ids: ProjectDeleteInput[],
  ext: Express.Request['ext']
): Promise<void> => {
  if (!ids.length) {
    throw new AppError('No projects to delete', HttpStatus.BAD_REQUEST);
  }

  await ext.db<Project>('projects')
    .whereIn('id', ids)
    .delete()
    .whereNull('deletedAt');
};