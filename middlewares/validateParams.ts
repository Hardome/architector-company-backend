import {RequestHandler} from 'express';
import {ZodObject} from 'zod';

import {HttpStatus} from '#constants/httpStatus';

const validateParams = (schema: ZodObject<any>): RequestHandler => (req, res, next) => {
  const result = schema.safeParse(req.params);

  if (!result.success) {
    res.status(HttpStatus.BAD_REQUEST).json({errors: result.error.issues});

    return;
  }

  req.params = result.data;

  next();
};

export default validateParams;


