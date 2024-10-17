type ErrorResponse = {
    message: string;
    statusCode: number;
}

export type UserProfile = {
    id: string;
    name?: string;
    email?: string;
}


export default ErrorResponse;