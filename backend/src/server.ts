import express, { Application } from 'express';
import cors from 'cors'
import { apiV1 } from './routes/v1';
import { env } from './assets/config/environment';
import { connectDB } from './database/database';

connectDB()
  .then(() => console.log('Connected successfully to database server!'))
  .then(() => bootServer())
  .catch(error => {
    console.error(error)
    process.exit(1)
  })

const bootServer = () => {
  const app: Application = express();
  const port = env.APP_PORT || 7500;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
  })
  app.use(cors({ origin: "*" }));
  app.use('/v1', apiV1);

  app.listen(port, () => {
    console.log('Create register endpoint');
    console.log(`Server is Fire at http://localhost:${port}`);
  });
}