import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
  }
}

function formatZodError(error: ZodError): string {
  return error.issues
    .map((issue) => `${issue.path.length > 0 ? `${issue.path.join('.')}: ` : ''}${issue.message}`)
    .join(', ');
}

export function errorMiddleware(error: unknown, _request: Request, response: Response, _next: NextFunction): void {
  if (error instanceof SyntaxError && 'body' in error) {
    response.status(400).json({
      error: 'Validation error',
      message: 'Invalid JSON payload',
    });
    return;
  }

  if (error instanceof ZodError) {
    response.status(400).json({
      error: 'Validation error',
      message: formatZodError(error),
    });
    return;
  }

  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      error: error.name,
      message: error.message,
    });
    return;
  }

  // eslint-disable-next-line no-console
  console.error(error);
  response.status(500).json({
    error: 'Internal Server Error',
    message: 'Unexpected error occurred',
  });
}
