import {Knex} from 'knex';
import type {Multer} from 'multer';

declare global {
  namespace Express {
    interface Request {
      ext: {
        db: Knex;
        logger: Console;
        upload: Multer;
      };
    }
  }
}