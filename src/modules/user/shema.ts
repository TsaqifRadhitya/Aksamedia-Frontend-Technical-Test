import { z } from "zod";

export const UpdateUserValidator = z.object({
    name: z
        .string()
        .min(1, { message: "Name is required" })
        .max(255, { message: "Name is too long" }),

    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),

    phone: z
        .string()
        .regex(/^[0-9+\-]+$/, { message: "Phone number can only contain digits, +, and -" })
        .min(1, { message: "Phone number is required" })
        .min(10, { message: "Phone number must be at least 10 digits" })
});