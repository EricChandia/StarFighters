import cors from 'cors';
import express, { json } from "express";
import dotenv from "dotenv";
import battleRouter from "./routes/battleRouter";
import errorHandler from "./middlewares/errorHandlerMiddleware";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());
app.use(battleRouter);
app.use(errorHandler);


const PORT = process.env.PORT;

app.listen(5000, () => console.log(`Servidor na porta: ${PORT}`));