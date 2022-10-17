import { Request, Response } from 'express';
import { ShowProductUseCase } from './ShowProductUseCase';

export class ShowProductController {
  constructor(private showProductUseCase: ShowProductUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const product = await this.showProductUseCase.execute({ id: id as string });

    return res.json(product);
  }
}
