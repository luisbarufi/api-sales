import { Request, Response } from 'express';

import { RefreshTokenUseCase } from './RefreshTokenUseCase';

export class RefreshTokenController {
  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const token =
      request.body.token ||
      request.headers['x-access-token'] ||
      request.query.token;

    const refreshToken = await this.refreshTokenUseCase.execute(token);

    return response.json(refreshToken);
  }
}
