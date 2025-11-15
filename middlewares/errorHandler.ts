import {Request, Response, NextFunction} from 'express';
import {AppError} from '../utils';
import {HttpStatus} from '../constants/httpStatus';

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  let appError = error;

  if (!(error instanceof AppError)) {
    // Log unexpected errors
    req.ext.logger.error('Unexpected error:', {
      message: error.message,
      stack: error.stack,
      url: req.url,
      method: req.method
    });

    appError = new AppError('Internal server error', HttpStatus.INTERNAL_ERROR);
  }

  res.status((appError as AppError).statusCode).json({
    success: false,
    error: {
      message: appError.message,
      code: (appError as AppError).statusCode
    },
    ...(process.env.NODE_ENV === 'development' && {stack: appError.stack})
  });
};

export default errorHandler;