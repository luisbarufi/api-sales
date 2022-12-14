import 'express-async-errors';

import { Router } from 'express';
import { productsRoutes } from './products.routes';
import { usersRoutes } from './users.routes';
import { authenticationRoutes } from './authenticate.routes';

export const router = Router();

router.use('/products', productsRoutes);
router.use('/users', usersRoutes);
router.use(authenticationRoutes);
