import { z } from "zod";

export const loginValidator = z.object({
    username: z
        .string()
        .min(1, { message: "Username is required" })
        .trim(),
    password: z
        .string()
        .min(1, { message: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters" }),
});
export type TLoginSchema = z.infer<typeof loginValidator>;