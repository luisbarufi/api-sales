import { body } from 'express-validator';

export const createUserSchema = [
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('email').isEmail().isString().withMessage('Email is not valid'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password less than 6 characters'),
];
