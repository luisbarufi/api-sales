import { AppError } from '../../../../shared/errors/AppError';
import { ICreateProductDTO } from '../../dtos/ICreateProductDTO';
import { IProductsRepository } from '../../repositories/IProductsRepository';

export class CreateProductUseCase {
  constructor(private productRepository: IProductsRepository) {}

  async execute({ name, price, quantity }: ICreateProductDTO): Promise<void> {
    const productAlreadyExists = await this.productRepository.findByName(name);

    if (productAlreadyExists) throw new AppError('Product already exists!');

    await this.productRepository.create({ name, price, quantity });
  }
}
