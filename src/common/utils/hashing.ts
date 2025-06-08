import * as bcrypt from 'bcrypt';
import { ROUND_NUMBER } from '@common/constants/security.conf';

export async function hashUserPassword(plaintext: string): Promise<string> {
  const salt = await generateSalt();
  const hash = await bcrypt.hash(plaintext, salt);

  return hash;
}

export async function validatePassword(
  password: string,
  encripted: string,
): Promise<boolean> {
  return await bcrypt.compare(password, encripted);
}

async function generateSalt(): Promise<string> {
  return await bcrypt.genSalt(ROUND_NUMBER);
}
