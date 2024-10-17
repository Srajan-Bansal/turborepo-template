import ErrorResponse from "../types/types";

class AppError extends Error {
    public statusCode: number;
    constructor({ statusCode, message }: ErrorResponse) {
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;