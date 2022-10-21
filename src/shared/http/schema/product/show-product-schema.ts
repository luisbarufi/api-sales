import { param } from 'express-validator';

export const showProductSchema = [
  param('id').isUUID().withMessage('Id is not valid'),
];
