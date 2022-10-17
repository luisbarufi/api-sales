import { Request, Response } from 'express';
import { UpdateProductUseCase } from './UpdateProductUseCase';

export class UpdateProductController {
  constructor(private updateProductUseCase: UpdateProductUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, price, quantity } = req.body;

    const product = await this.updateProductUseCase.execute({
      id: id as string,
      name: name as string,
      price: price as number,
      quantity: quantity as number,
    });

    return res.json(product);
  }
}
