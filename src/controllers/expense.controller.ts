import { NextFunction, Request, Response } from 'express';
import { createExpenseSchema } from '../validations/expense.schema';
import { AppError } from '../middleware/error.middleware';
import { expenseService } from '../services/expense.service';

export class ExpenseController {
  async createExpense(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const payload = createExpenseSchema.parse(request.body);
      const expense = await expenseService.createExpense(payload);
      response.status(201).json(expense);
    } catch (error) {
      next(error);
    }
  }

  async getExpenses(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const category = typeof request.query.category === 'string' ? request.query.category : undefined;
      const expenses = await expenseService.getExpenses(category);
      response.status(200).json(expenses);
    } catch (error) {
      next(error);
    }
  }

  async getSummary(_request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const summary = await expenseService.getSummary();
      response.status(200).json(summary);
    } catch (error) {
      next(error);
    }
  }

  async deleteExpense(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = request.params as { id: string };

      if (id.trim().length === 0) {
        throw new AppError(400, 'Expense id is required');
      }

      await expenseService.deleteExpense(id);
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export const expenseController = new ExpenseController();
