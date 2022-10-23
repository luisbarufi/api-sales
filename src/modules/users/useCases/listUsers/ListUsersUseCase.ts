import { User } from '../../typeorm/entities/User';
import { UsersRepository } from '../../typeorm/repositories/UsersRepository';

export class ListUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<User[]> {
    const users = await this.usersRepository.list();

    return users;
  }
}
