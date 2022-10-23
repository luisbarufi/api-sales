import { Request, Response, Router } from 'express';
import { UsersRepository } from '../../../modules/users/typeorm/repositories/UsersRepository';
import { CreateUserController } from '../../../modules/users/useCases/createUser/CreateUserController';
import { CreateUserUseCase } from '../../../modules/users/useCases/createUser/CreateUserUseCase';
import { ListUsersController } from '../../../modules/users/useCases/listUsers/ListUsersController';
import { ListUsersUseCase } from '../../../modules/users/useCases/listUsers/ListUsersUseCase';
import { validateRequestSchema } from '../middlewares/validate-request-schema';
import { createUserSchema } from '../schema/user/create-user-schema';

export const usersRoutes = Router();
const usersRepository = new UsersRepository();

const createUserUseCase = new CreateUserUseCase(usersRepository);
const createUserController = new CreateUserController(createUserUseCase);

const listUsersUseCase = new ListUsersUseCase(usersRepository);
const listUsersController = new ListUsersController(listUsersUseCase);

usersRoutes.post(
  '/',
  createUserSchema,
  validateRequestSchema,
  (req: Request, res: Response) => {
    return createUserController.handle(req, res);
  },
);

usersRoutes.get('/', (req, res) => {
  return listUsersController.handle(req, res);
});
