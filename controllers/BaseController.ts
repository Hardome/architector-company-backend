import {Response} from 'express';

import {HttpStatus} from '#constants/httpStatus';

export abstract class BaseController {
  protected success(
    res: Response,
    data: unknown,
    message: string = 'Success',
    statusCode: HttpStatus = HttpStatus.OK
  ) {
    res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  protected created(res: Response, data: any, message: string = 'Resource created') {
    this.success(res, data, message, HttpStatus.CREATED);
  }

  protected error(
    res: Response,
    message: string,
    statusCode: HttpStatus = HttpStatus.INTERNAL_ERROR
  ) {
    res.status(statusCode).json({
      success: false,
      error: {
        message,
        code: statusCode
      }
    });
  }
}