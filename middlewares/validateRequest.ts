import {RequestHandler} from 'express';
import {ZodObject, ZodArray} from 'zod';
import {HttpStatus} from '#constants/httpStatus';

const validateRequest = (schema: ZodObject | ZodArray): RequestHandler => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    res.status(HttpStatus.BAD_REQUEST).json({errors: result.error.issues});

    return;
  }

  req.body = result.data;

  next();
};

export default validateRequest;