import { Request, Response } from 'express';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    try {
      const token = await this.authenticateUserUseCase.execute({
        password,
        email,
      });

      return response.json(token);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
