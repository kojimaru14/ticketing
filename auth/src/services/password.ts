import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util'; // this can take callback based function and turn it into promise based function (compatible with async/await)

const scryptAsync = promisify(scrypt);

export class Password{
  // static method means the method can be called without creating the instance of the Password class
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer; // When we use scrypt, we get buffer in return

    return `${buf.toString('hex')}.${salt}`; // return hash results along with salt (concatenated by dot)
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString('hex') === hashedPassword; // return the result of comparison (supplied vs stored)
  }
}