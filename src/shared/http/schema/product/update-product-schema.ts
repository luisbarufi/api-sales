import { body, param } from 'express-validator';

export const updateProductSchema = [
  param('id').isUUID().withMessage('Id is not valid'),
  body('price').isFloat().withMessage('Price is not valid'),
  body('quantity').isInt().withMessage('Quantity is not valid'),
];
