import { Request, Response } from 'express';
import { ListUsersUseCase } from './ListUsersUseCase';

export class ListUsersController {
  constructor(private listUsersUseCase: ListUsersUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const products = await this.listUsersUseCase.execute();

    return res.json(products);
  }
}
