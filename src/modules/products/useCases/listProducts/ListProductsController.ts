import { Request, Response } from 'express';
import { ListProductsUseCase } from './ListProductsUseCase';

export class ListProductsController {
  constructor(private listProductUseCase: ListProductsUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const products = await this.listProductUseCase.execute();

    return res.json(products);
  }
}
