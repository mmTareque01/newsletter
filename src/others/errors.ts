// src/errors/custom-error.ts
type StatusCode = 'ER400' | 'ER401' | 'ER404' | 'ER409' | 'ER500'; // add more as needed

export class CustomError extends Error {
  constructor(
    public readonly statusCode: StatusCode,
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
