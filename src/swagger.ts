import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Smart Expense Tracker API",
            version: "1.0.0",
            description: "REST API for managing personal expenses"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: ["./src/routes/*.ts"]
};

export const swaggerSpec = swaggerJsdoc(options);