# Smart Expense Tracker API

A REST API for managing personal expenses built with **Node.js**, **Express.js**, and **TypeScript**. The API stores data in a local JSON file and supports creating, retrieving, filtering, summarizing, and deleting expenses. It also includes request validation with Zod, integration tests using Vitest and Supertest, and interactive API documentation with Swagger.

## Features

* Add a new expense
* View all expenses
* Filter expenses by category
* Get total expenses (overall and by category)
* Delete an expense
* Request validation using Zod
* Centralized error handling
* Integration tests with Vitest & Supertest
* Swagger/OpenAPI documentation

## Tech Stack

* Node.js
* Express.js
* TypeScript
* Zod
* Vitest
* Supertest
* Swagger (swagger-jsdoc & swagger-ui-express)

## Project Structure

```text
smart-expense-tracker-api/
├── data/
│   └── expenses.json
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── validations/
│   ├── app.ts
│   ├── server.ts
│   └── swagger.ts
├── tests/
├── AI_NOTES.md
├── README.md
├── package.json
└── tsconfig.json
```

## Installation

Clone the repository:

```bash
git clone https://github.com/RishiSharmapro/Smart-Expense-Tracker-API.git
cd Smart-Expense-Tracker-API
```

Install dependencies:

```bash
npm install
```

## Running the Server

Start the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Run the production build:

```bash
npm start
```

## Running Tests

Run the complete test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## API Endpoints

| Method | Endpoint                  | Description                 |
| ------ | ------------------------- | --------------------------- |
| POST   | `/expenses`               | Create a new expense        |
| GET    | `/expenses`               | Get all expenses            |
| GET    | `/expenses?category=Food` | Filter expenses by category |
| GET    | `/expenses/summary`       | Get expense summary         |
| DELETE | `/expenses/:id`           | Delete an expense           |

## Sample Request

**POST /expenses**

```json
{
  "title": "Lunch",
  "amount": 250,
  "category": "Food",
  "date": "2026-08-02"
}
```

## Swagger Documentation

Once the server is running, open:

```text
http://localhost:3000/docs
```

to explore and test the API using the interactive Swagger UI.

## Notes

* Expenses are stored in `data/expenses.json`.
* No database is required.
* Request validation is performed using Zod.
* All API endpoints are covered by integration tests.
