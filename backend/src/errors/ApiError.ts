export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(msg = "Bad Request") {
    return new ApiError(400, msg);
  }

  static unauthorized(msg = "Unauthorized") {
    return new ApiError(401, msg);
  }

  static forbidden(msg = "Forbidden") {
    return new ApiError(403, msg);
  }

  static notFound(msg = "Not Found") {
    return new ApiError(404, msg);
  }

  static internal(msg = "Internal Server Error") {
    return new ApiError(500, msg);
  }
}
