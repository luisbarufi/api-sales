import { Router } from 'express';
import { UsersRepository } from '../../../modules/users/typeorm/repositories/UsersRepository';
import { CreateUserController } from '../../../modules/users/useCases/createUser/CreateUserController';
import { CreateUserUseCase } from '../../../modules/users/useCases/createUser/CreateUserUseCase';

export const usersRoutes = Router();
const usersRepository = new UsersRepository();

const createUserUseCase = new CreateUserUseCase(usersRepository);
const createUserController = new CreateUserController(createUserUseCase);

usersRoutes.post('/', (req, res) => {
  return createUserController.handle(req, res);
});
