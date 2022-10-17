import { Repository } from 'typeorm';
import { AppError } from '../../../../shared/errors/AppError';
import { IProductsRepository } from '../../repositories/IProductsRepository';
import { Product } from '../../typeorm/entities/Product';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export class UpdateProductUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) throw new AppError('Product not found');

    const productAlreadyExists = await this.productsRepository.findByName(name);

    if (productAlreadyExists && name !== product.name)
      throw new AppError('Product already exists!');

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await this.productsRepository.save(product);

    return product;
  }
}
