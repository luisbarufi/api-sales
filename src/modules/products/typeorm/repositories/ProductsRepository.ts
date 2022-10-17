import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../shared/typeorm/data-source';
import { Product } from '../entities/Product';
import { IProductsRepository } from '../../repositories/IProductsRepository';
import { ICreateProductDTO } from '../../dtos/ICreateProductDTO';

export class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = AppDataSource.getRepository(Product);
  }

  async create({ name, price, quantity }: ICreateProductDTO): Promise<void> {
    const product = this.repository.create({ name, price, quantity });

    await this.repository.save(product);
  }

  async save({ id, name, price, quantity }: ICreateProductDTO): Promise<void> {
    await this.repository.save({ id, name, price, quantity });
  }

  async destroy(id: string): Promise<void> {
    console.log(id);
    await this.repository.delete({ id });
  }

  async list(): Promise<Product[]> {
    const products = await this.repository.find();

    return products;
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.repository.findOne({ where: { id } });

    return product;
  }

  async findByName(name: string): Promise<Product | null> {
    const product = await this.repository.findOne({ where: { name } });

    return product;
  }
}
