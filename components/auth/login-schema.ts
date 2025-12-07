import { z } from "zod";

const requiredString = z.string().trim().min(1, "Harus diisi");

export const loginSchema = z.object({
  email: requiredString.email("Alamat email tidak valid"),
  password: requiredString.min(4, "Password harus minimal 4 karakter"),
});
export type LoginSchemaValues = z.infer<typeof loginSchema>;
