import 'express-async-errors';

import { Router } from 'express';
import { AppError } from '../../errors/AppError';

export const routes = Router();

routes.get('/', (req, res) => {
  throw new AppError('Oops', 401);
});
