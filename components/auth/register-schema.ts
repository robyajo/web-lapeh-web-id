import { z } from "zod";

const requiredString = z.string().trim().min(1, "Harus diisi");

export const registerSchema = z.object({
  name: requiredString,
  email: requiredString.email("Alamat email tidak valid"),
  password: requiredString.min(6, "Password harus minimal 6 karakter"),
});
export type RegisterSchemaValues = z.infer<typeof registerSchema>;
