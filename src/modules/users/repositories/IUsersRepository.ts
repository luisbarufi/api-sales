import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../typeorm/entities/User';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  list(): Promise<User[]>;
}
