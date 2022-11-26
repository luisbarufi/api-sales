import { sign, verify } from 'jsonwebtoken';
import auth from '../../../../config/auth';
import { AppError } from '../../../../shared/errors/AppError';
import { IDateProvider } from '../../../../shared/providers/DateProvider/IDateProvider';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';

interface IPayLoad {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

export class RefreshTokenUseCase {
  constructor(
    private usersTokensRepository: IUsersTokensRepository,
    private dateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const {
      secret_token,
      expires_in_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;

    const { sub, email } = verify(
      token,
      secret_refresh_token as string,
    ) as IPayLoad;

    const user_id = sub;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token,
      );

    if (!userToken) {
      throw new AppError('Refresh Token does not exists!');
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, secret_refresh_token as string, {
      subject: sub,
      expiresIn: expires_in_refresh_token,
    });

    const expires_date = this.dateProvider.addDays(expires_refresh_token_days);

    await this.usersTokensRepository.create({
      user_id,
      expires_date,
      refresh_token,
    });

    const newToken = sign({}, secret_token as string, {
      subject: user_id,
      expiresIn: expires_in_token,
    });

    return {
      refresh_token,
      token: newToken,
    };
  }
}
