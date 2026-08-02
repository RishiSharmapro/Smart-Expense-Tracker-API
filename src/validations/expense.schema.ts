import { z } from 'zod';

const isoDateSchema = z
  .string()
  .trim()
  .date()
  .refine((value) => !Number.isNaN(Date.parse(value)), {
    message: 'Date must be a valid ISO date string',
  });

export const createExpenseSchema = z.object({
  title: z.string().trim().min(2, 'Title must be at least 2 characters long'),
  amount: z.number().positive('Amount must be a positive number'),
  category: z.string().trim().min(1, 'Category is required'),
  date: isoDateSchema,
});

export type CreateExpenseRequest = z.infer<typeof createExpenseSchema>;
