import express, { Express } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import TodoRoutes from './src/routes/Toto.route'
import UserRoutes from './src/routes/User.route'
import AuthRoutes from './src/routes/Auth.route'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use('/todos', TodoRoutes);
app.use('/users', UserRoutes)
app.use('/auth', AuthRoutes)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app