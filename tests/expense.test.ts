import { beforeEach, expect, describe, it } from "vitest";
import fs from "fs/promises";
import path from "path";
import request from "supertest";
import app from "../src/app";
import { Expense } from "../src/models/expense";

const DATA_FILE = path.resolve(process.cwd(), "data", "expenses.json");
const TEST_DATE = new Date().toISOString().split("T")[0];

beforeEach(async () => {
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
});

describe("POST /expenses", () => {
    it("should create a new expense", async () => {
        const expense = {
            title: "Pizza",
            amount: 500,
            category: "Food",
            date: TEST_DATE,
        };

        const response = await request(app).post("/expenses").send(expense);

        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
        expect(response.body).toMatchObject(expense);
    });

    it("should return 400 for invalid payload", async () => {
        const invalidExpense = {
            title: "",
            amount: -100,
            category: "",
            date: "invalid-date",
        }

        const response = await request(app).post("/expenses").send(invalidExpense);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Validation error");

        expect(response.body.message).toContain("Title must be at least 2 characters long");
        expect(response.body.message).toContain("Amount must be a positive number");
        expect(response.body.message).toContain("Category is required");
        expect(response.body.message).toContain("Date must be a valid ISO date string");
    });

    it("should return all expenses", async () => {
        const expense1 = {
            title: "Pizza",
            amount: 500,
            category: "Food",
            date: TEST_DATE,
        };
        
        const expense2 = {
            title: "Movie",
            amount: 300,
            category: "Entertainment",
            date: TEST_DATE,
        };

        await request(app).post("/expenses").send(expense1);
        await request(app).post("/expenses").send(expense2);

        const response = await request(app).get("/expenses");

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);

        expect(response.body[0]).toMatchObject(expense1);
        expect(response.body[1]).toMatchObject(expense2);
    });

    it("should filter expenses by category", async () => {
        const expense1 = {
            title: "Pizza",
            amount: 500,
            category: "Food",
            date: TEST_DATE,
        };
        
        const expense2 = {
            title: "Movie",
            amount: 300,
            category: "Entertainment",
            date: TEST_DATE,
        };

        const expense3 = {
            title: "Tacos",
            amount: 200,
            category: "Food",
            date: TEST_DATE,
        };
        
        await request(app).post("/expenses").send(expense1);
        await request(app).post("/expenses").send(expense2);
        await request(app).post("/expenses").send(expense3);

        const response = await request(app).get("/expenses").query({ category: "Food" });

        expect(response.status).toBe(200);

        expect(response.body.length).toBe(2);
        expect(response.body[0]).toMatchObject(expense1);
        expect(response.body[1]).toMatchObject(expense3);
        
        expect(response.body.every((expense: Expense) => expense.category === "Food")).toBe(true);
    });

    describe("GET /expenses/summary", () => {
        it("should return the summary of expenses", async () => {
            const expense1 = {
                title: "Pizza",
                amount: 500,
                category: "Food",
                date: TEST_DATE,
            };
            
            const expense2 = {
                title: "Movie",
                amount: 300,
                category: "Entertainment",
                date: TEST_DATE,
            };

            const expense3 = {
                title: "Tacos",
                amount: 200,
                category: "Food",
                date: TEST_DATE,
            };
            
            await request(app).post("/expenses").send(expense1);
            await request(app).post("/expenses").send(expense2);
            await request(app).post("/expenses").send(expense3);

            const response = await request(app).get("/expenses/summary");

            expect(response.status).toBe(200);

            expect(response.body.overall).toBe(1000);
            expect(response.body.byCategory).toEqual({
                "Food": 700,
                "Entertainment": 300,
            });
        });

        it("should return zero totals when no expenses exist", async () => {
            const response = await request(app)
                .get("/expenses/summary");

            expect(response.status).toBe(200);

            expect(response.body.overall).toBe(0);
            expect(response.body.byCategory).toEqual({});
        });
    });

    describe("DELETE /expenses/:id", () => {
        it("should delete an expense", async () => {
            const expense = {
                title: "Pizza",
                amount: 500,
                category: "Food",
                date: TEST_DATE,
            };

            const createdResponse = await request(app).post("/expenses").send(expense);
            const expenseId = createdResponse.body.id;

            const deleteResponse = await request(app).delete(`/expenses/${expenseId}`);

            expect(deleteResponse.status).toBe(204);

            const getResponse = await request(app).get("/expenses");

            expect(getResponse.status).toBe(200);
            expect(getResponse.body).toHaveLength(0);
        });

        it("should return 404 for a non-existent expense", async () => {

            const response = await request(app)
                .delete("/expenses/random-id");

            expect(response.status).toBe(404);

            expect(response.body.error).toBe("AppError");
            expect(response.body.message).toContain("Expense not found");
        });

        it("should return 400 for an invalid expense id", async () => {
            const response = await request(app).delete("/expenses/123");

            expect(response.status).toBe(404);
            expect(response.body.error).toBe("AppError");
            expect(response.body.message).toContain("Expense not found");
        });

        it("should return 400 when expense id is empty", async () => {
            const response = await request(app).delete("/expenses/%20");

            expect(response.status).toBe(400);
            expect(response.body.error).toBe("AppError");
            expect(response.body.message).toBe("Expense id is required");
        });
    });
});
