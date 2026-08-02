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
                url: "/"
            }
        ]
    },
    apis: [
        "./src/routes/*.ts",
        "./dist/routes/*.js"
    ]
};

export const swaggerSpec = swaggerJsdoc(options);