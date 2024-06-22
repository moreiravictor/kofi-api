export class UserNotFoundError extends Error {
  code = 404;

  constructor() {
    super("User not found");
  }
}