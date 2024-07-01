import crypto from "crypto";

export class PasswordCryptographer {
  private static iterations = 1000;
  private static keylen = 64;
  private static digest = "sha512";
  private static stringEncode: BufferEncoding = "hex";
  private static randomBytesSize = 16;

  static encrypt(password: string): string {
    const salt = crypto
      .randomBytes(this.randomBytesSize)
      .toString(this.stringEncode);

    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, this.iterations, this.keylen, this.digest)
      .toString(this.stringEncode);

    return `${hashedPassword}.${salt}`;
  }

  static validate(sentPassword: string, storedPassword: string): boolean {
    const [encryptedStoredPassword, salt] = storedPassword.split(".");

    const encryptedSentPassword = crypto.pbkdf2Sync(
      sentPassword,
      salt,
      this.iterations,
      this.keylen,
      this.digest
    );

    return crypto.timingSafeEqual(
      Buffer.from(encryptedStoredPassword, this.stringEncode),
      encryptedSentPassword
    );
  }
}
