import { IProductsRepository } from '../../repositories/IProductsRepository';
import { Product } from '../../typeorm/entities/Product';

export class ListProductsUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(): Promise<Product[]> {
    const products = await this.productsRepository.list();

    return products;
  }
}
