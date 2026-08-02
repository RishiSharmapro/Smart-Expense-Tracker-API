# AI_NOTES.md

# AI Usage

## 1. AI-generated code

AI was used to accelerate the initial implementation of the project by generating the basic project structure, Express API boilerplate, routing, controller/service separation, JSON file storage utilities, and Zod validation schemas. It also helped scaffold the initial Swagger/OpenAPI configuration.

## 2. Manual changes

I reviewed and modified the generated code throughout development. I adjusted the validation logic, improved error handling, refined the API responses, fixed issues in the Swagger documentation (including the date validation), and ensured the project structure matched the assignment requirements.

I also wrote and verified the integration tests using Vitest and Supertest, making changes where necessary after running the test suite and validating the API behavior.

## 3. Validation performed

I manually tested every endpoint using Postman and Swagger UI. I verified:

* Successful expense creation.
* Validation failures for invalid requests.
* Fetching all expenses.
* Filtering expenses by category.
* Expense summary calculations.
* Deleting existing and non-existing expenses.

I also executed the complete Vitest test suite to ensure the API behaved correctly under different scenarios.

## 4. AI suggestions rejected

Some AI suggestions were simplified or not adopted after review. For example:

* I avoided unnecessary abstractions where a simpler implementation was sufficient for the assignment.
* I modified the date validation to accept ISO date strings (`YYYY-MM-DD`) instead of full ISO date-time values, as this better matched the project's requirements.
* I reviewed and corrected generated code rather than accepting it without verification to ensure the final implementation behaved as expected.
