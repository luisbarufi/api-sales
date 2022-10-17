import express from 'express';
import cors from 'cors';

import { AppDataSource } from '../typeorm/data-source';
import { errorMiddleware } from './middlewares/error';
import { router } from './routes';

AppDataSource.initialize().then(() => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(router);
  app.use(errorMiddleware);
  app.listen(process.env.PORT, () =>
    console.log('🚀 Server started on port 3333!'),
  );
});
