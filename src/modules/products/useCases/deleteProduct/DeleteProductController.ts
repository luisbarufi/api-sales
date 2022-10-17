import { Request, Response } from 'express';
import { DeleteProductUseCase } from './DeleteProductUseCase';

export class DeleteProductController {
  constructor(private deleteProductUseCase: DeleteProductUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await this.deleteProductUseCase.execute({ id: id as string });

    return res.json({ message: 'Product deleted successfully' });
  }
}
