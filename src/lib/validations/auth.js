import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email harus diisi" })
    .email({ message: "Format email tidak valid" }),
  password: z
    .string()
    .min(1, { message: "Password harus diisi" })
    .min(8, { message: "Password minimal 8 karakter" }),
});
