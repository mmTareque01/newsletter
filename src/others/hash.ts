import bcrypt from "bcrypt";

const saltRounds = 12; // Higher = more secure but slower

export async function hashPassword(plainPassword: string): Promise<string> {
  const hashed: string = await bcrypt.hash(plainPassword, saltRounds);
  return hashed;
}

export async function comparePassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
}
