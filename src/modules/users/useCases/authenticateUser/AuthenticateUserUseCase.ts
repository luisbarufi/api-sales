import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import auth from '../../../../config/auth';
import { AppError } from '../../../../shared/errors/AppError';
import { IDateProvider } from '../../../../shared/providers/DateProvider/IDateProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private dateProvider: IDateProvider,
    private usersTokensRepository: IUsersTokensRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    const {
      secret_token,
      expires_in_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;

    if (!user) {
      throw new AppError('Email or password incorrect');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect');
    }

    const token = sign({}, secret_token as string, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = sign({ email }, secret_refresh_token as string, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days,
    );

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      refresh_token,
    };

    return tokenReturn;
  }
}
