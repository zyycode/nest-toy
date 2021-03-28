import * as crypto from 'crypto';

/**
 * Make salt
 * @returns {string} salt
 */
export function makeSalt(): string {
  return crypto.randomBytes(3).toString('base64');
}

/**
 * Encrypt password
 * @param password
 * @param salt
 * @returns
 */
export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) return '';
  const tempSalt = Buffer.from(salt, 'base64');

  const iterations = 10000;
  const keylen = 16;
  const digest = 'sha1';
  return crypto
    .pbkdf2Sync(password, tempSalt, iterations, keylen, digest)
    .toString('base64');
}
