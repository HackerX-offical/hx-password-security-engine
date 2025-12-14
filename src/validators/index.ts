import { z } from "zod";

export const PasswordSchema = z
  .string()
  .min(1, "Password cannot be empty")
  .max(1024, "Password is too long (max 1024 chars)");

export class InputValidator {
  static validatePassword(password: string): string | null {
    const result = PasswordSchema.safeParse(password);
    if (!result.success) {
      return result.error.errors[0].message;
    }
    return null;
  }
}
