import 'express-async-errors';

import { Router } from 'express';
import { productsRoutes } from './products.routes';

export const router = Router();

router.use('/products', productsRoutes);
