import { param } from 'express-validator';

export const deleteProductSchema = [
  param('id').isUUID().withMessage('Id is not valid'),
];
