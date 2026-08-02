import { Router } from 'express';
import { expenseController } from '../controllers/expense.controller';

const expenseRouter = Router();

/**
 * @openapi
 * /expenses:
 *   get:
 *     summary: Get all expenses
 *     responses:
 *       200:
 *         description: List of expenses
 */
expenseRouter.get('/summary', expenseController.getSummary.bind(expenseController));
expenseRouter.get('/', expenseController.getExpenses.bind(expenseController));

/**
 * @openapi
 * /expenses:
 *   post:
 *     summary: Create an expense
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - category
 *               - date
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Expense created
 */
expenseRouter.post('/', expenseController.createExpense.bind(expenseController));

/**
 * @openapi
 * /expenses/{id}:
 *   delete:
 *     summary: Delete an expense
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Expense deleted
 */
expenseRouter.delete('/:id', expenseController.deleteExpense.bind(expenseController));

export default expenseRouter;
