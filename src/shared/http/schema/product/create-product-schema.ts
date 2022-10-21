import { body } from 'express-validator';

export const createProductSchema = [
  body('name').isString().notEmpty().withMessage('Names is required'),
  body('price').isFloat().withMessage('Price is not valid'),
  body('quantity').isInt().withMessage('Quantity is not valid'),
];
