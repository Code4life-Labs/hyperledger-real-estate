import express, { Application } from 'express';
import cors from 'cors'
import { apiV1 } from './routes/v1';
import { env } from './assets/config/environment';

const app: Application = express();
const port = env.APP_PORT || 7500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1', cors(), apiV1);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});