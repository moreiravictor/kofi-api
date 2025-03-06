export class KofiError extends Error {
  statusCode = 500;

  constructor(message?: string) {
    super(message ?? "Unknown Kofi Error.");
  }
}

export class BadRequestError extends KofiError {
  statusCode = 400;
}

export class UserNotFoundError extends KofiError {
  statusCode = 404;

  constructor() {
    super("User not found");
  }
}

export class PostNotFoundError extends KofiError {
  statusCode = 404;

  constructor() {
    super("Post not found");
  }
}

export class NoPasswordFoundError extends KofiError {
  statusCode = 400;

  constructor() {
    super("No password found for user");
  }
}

export class UnauthorizedGoogleSignInError extends KofiError {
  statusCode = 403;

  constructor() {
    super("Unauthorized google sign in");
  }
}

export class WrongPasswordError extends KofiError {
  statusCode = 400;

  constructor() {
    super("Wrong password");
  }
}
