export class KofiError extends Error {
  statusCode = 500;

  constructor(message?: string) {
    super(message ?? "Unknown Kofi Error.");
  }

}

export class UserNotFoundError extends KofiError {
  statusCode = 404;

  constructor() {
    super("User not found");
  }
}