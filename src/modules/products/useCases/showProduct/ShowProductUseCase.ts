import { AppError } from '../../../../shared/errors/AppError';
import { IProductsRepository } from '../../repositories/IProductsRepository';
import { Product } from '../../typeorm/entities/Product';

interface IRequest {
  id: string;
}

export class ShowProductUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute({ id }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) throw new AppError('Product not found');

    return product;
  }
}
