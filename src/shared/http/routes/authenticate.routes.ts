import { Router } from 'express';
import { UsersRepository } from '../../../modules/users/typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '../../../modules/users/typeorm/repositories/UsersTokensRepository';
import { AuthenticateUserController } from '../../../modules/users/useCases/authenticateUser/AuthenticateUserController';
import { AuthenticateUserUseCase } from '../../../modules/users/useCases/authenticateUser/AuthenticateUserUseCase';
import { RefreshTokenController } from '../../../modules/users/useCases/RefreshTokenUseCase/RefreshTokenController';
import { RefreshTokenUseCase } from '../../../modules/users/useCases/RefreshTokenUseCase/RefreshTokenUseCase';
import { DaysDateProvider } from '../../providers/DateProvider/DaysDateProvider';

export const authenticationRoutes = Router();

const usersRepository = new UsersRepository();
const daysDateProvider = new DaysDateProvider();
const usersTokensRepository = new UsersTokensRepository();

const authenticateUserUseCase = new AuthenticateUserUseCase(
  usersRepository,
  daysDateProvider,
  usersTokensRepository,
);

const authenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase,
);

const refreshTokenUseCase = new RefreshTokenUseCase(
  usersTokensRepository,
  daysDateProvider,
);

const refreshTokenController = new RefreshTokenController(refreshTokenUseCase);

authenticationRoutes.post('/sessions', (req, res) => {
  authenticateUserController.handle(req, res);
});

authenticationRoutes.post('/refresh-token', (req, res) => {
  refreshTokenController.handle(req, res);
});
