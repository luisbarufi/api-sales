import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors/AppError';

export function validate(schema: any) {
  const filterFloat = (value: string) => {
    if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value))
      return Number(value);
    return NaN;
  };

  const validation = (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    Object.keys(schema).forEach(item => {
      const itemSchema = schema[item];

      if (itemSchema.required && !body[item])
        throw new AppError('Name is required!');

      if (itemSchema.type === 'int' && !Number.isInteger(body[item]))
        throw new AppError('Quantity not is a number!');

      if (itemSchema.type === 'decimal')
        if (isNaN(filterFloat(body[item])))
          throw new AppError('Price not is a number!');
    });

    return next();
  };

  return validation;
}
