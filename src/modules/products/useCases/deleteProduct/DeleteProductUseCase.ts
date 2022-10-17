import { AppError } from '../../../../shared/errors/AppError';
import { IProductsRepository } from '../../repositories/IProductsRepository';

interface IRequest {
  id: string;
}

export class DeleteProductUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute({ id }: IRequest): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) throw new AppError('Product not found');

    this.productsRepository.destroy(id);
  }
}
