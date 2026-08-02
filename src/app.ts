import express from 'express';
import { swaggerSpec } from "./swagger";
import swaggerUi from "swagger-ui-express";
import expenseRouter from './routes/expense.routes';
import { errorMiddleware } from './middleware/error.middleware';

const app = express();

app.use(express.json());


app.use('/expenses', expenseRouter);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((_request, response) => {
  response.status(404).json({
    error: 'Not Found',
    message: 'Route not found',
  });
});


app.use(errorMiddleware);

export default app;
