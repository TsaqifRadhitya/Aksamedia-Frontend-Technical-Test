import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

export const EmployeeValidator = z.object({
    image: z
        .any()
        .refine((files) => files?.length >= 1, { message: "Image is required." })
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
            message: `Max file size is 5MB.`,
        })
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            {
                message: "Only .jpg, .jpeg, .png and .webp formats are supported.",
            }
        ),

    name: z
        .string()
        .min(1, { message: "Employee name is required" })
        .min(3, { message: "Name must be at least 3 characters" })
        .trim(),

    phone: z
        .string()
        .min(1, { message: "Phone number is required" })
        .min(10, { message: "Phone number is too short" })
        .max(15, { message: "Phone number is too long" })
        .regex(/^[0-9]+$/, { message: "Phone number must contain only digits" }),

    division: z
        .string()
        .min(1, { message: "Please select a division" }),

    position: z
        .string()
        .min(1, { message: "Position is required" })
        .trim(),
});
export type TEmployeeForm = z.infer<typeof EmployeeValidator>;