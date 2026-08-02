export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

export interface ExpenseSummary {
  overall: number;
  byCategory: Record<string, number>;
}

export interface CreateExpenseInput {
  title: string;
  amount: number;
  category: string;
  date: string;
}
