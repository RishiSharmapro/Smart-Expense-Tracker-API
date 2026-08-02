import path from "path";
import express from 'express';
import { swaggerSpec } from "./swagger";
import swaggerUiDist from "swagger-ui-dist";
import expenseRouter from './routes/expense.routes';
import { errorMiddleware } from './middleware/error.middleware';

const app = express();

app.use(express.json());


app.use('/expenses', expenseRouter);

const swaggerPath = swaggerUiDist.getAbsoluteFSPath();

app.use("/docs", express.static(swaggerPath, { index: false }));

app.get("/openapi.json", (_req, res) => {
  res.json(swaggerSpec);
});

app.use(express.static("public"));

app.get("/docs", (_req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "swagger.html"));
});

app.use((_request, response) => {
  response.status(404).json({
    error: 'Not Found',
    message: 'Route not found',
  });
});


app.use(errorMiddleware);

export default app;
