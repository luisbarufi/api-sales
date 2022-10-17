import { ICreateProductDTO } from '../dtos/ICreateProductDTO';
import { Product } from '../typeorm/entities/Product';

export interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<void>;
  save(data: ICreateProductDTO): Promise<void>;
  findByName(name: string): Promise<Product | null>;
  findById(id: string): Promise<Product | null>;
  destroy(id: string): Promise<void>;
  list(): Promise<Product[]>;
}
