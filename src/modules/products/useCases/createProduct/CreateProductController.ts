import { Request, Response } from 'express';
import { CreateProductUseCase } from './CreateProductUseCase';

export class CreateProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;

    try {
      await this.createProductUseCase.execute({ name, price, quantity });

      return res.status(201).send();
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
}
