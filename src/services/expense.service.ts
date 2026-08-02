import { randomUUID } from 'crypto';
import { AppError } from '../middleware/error.middleware';
import { CreateExpenseInput, Expense, ExpenseSummary } from '../models/expense';
import { dataFilePath, readJsonFile, writeJsonFile } from '../utils/fileStorage';

const emptySummary: ExpenseSummary = {
  overall: 0,
  byCategory: {},
};

export class ExpenseService {
  private async readExpenses(): Promise<Expense[]> {
    const expenses = await readJsonFile<Expense[]>(dataFilePath, []);
    return Array.isArray(expenses) ? expenses : [];
  }

  private async persistExpenses(expenses: Expense[]): Promise<void> {
    await writeJsonFile(dataFilePath, expenses);
  }

  async createExpense(input: CreateExpenseInput): Promise<Expense> {
    const expenses = await this.readExpenses();
    const expense: Expense = {
      id: randomUUID(),
      title: input.title.trim(),
      amount: input.amount,
      category: input.category.trim(),
      date: new Date(input.date).toISOString().split('T')[0],
    };

    expenses.push(expense);
    await this.persistExpenses(expenses);

    return expense;
  }

  async getExpenses(category?: string): Promise<Expense[]> {
    const expenses = await this.readExpenses();

    if (!category) {
      return expenses;
    }

    const normalizedCategory = category.trim();
    return expenses.filter((expense) => expense.category === normalizedCategory);
  }

  async getSummary(): Promise<ExpenseSummary> {
    const expenses = await this.readExpenses();

    return expenses.reduce<ExpenseSummary>((summary, expense) => {
      summary.overall += expense.amount;
      summary.byCategory[expense.category] = (summary.byCategory[expense.category] ?? 0) + expense.amount;
      return summary;
    }, { ...emptySummary, byCategory: {} });
  }

  async deleteExpense(id: string): Promise<void> {
    const expenses = await this.readExpenses();
    const expenseIndex = expenses.findIndex((expense) => expense.id === id);

    if (expenseIndex === -1) {
      throw new AppError(404, 'Expense not found');
    }

    expenses.splice(expenseIndex, 1);
    await this.persistExpenses(expenses);
  }
}

export const expenseService = new ExpenseService();
