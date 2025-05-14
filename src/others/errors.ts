// src/errors/custom-error.ts
export class CustomError extends Error {
  constructor(
    public readonly statusCode: string,
    message: string,
    public readonly details?: any
  ) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
    this.name = this.constructor.name;
  }

  toJSON() {
    return {
      error: this.name,
      statusCode: this.statusCode,
      message: this.message,
      details: this.details,
      stack: process.env.NODE_ENV === "development" ? this.stack : undefined,
    };
  }
}
