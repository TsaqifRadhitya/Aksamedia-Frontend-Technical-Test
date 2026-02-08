import z from "zod";

export const EmployeeValidator = z.object({
    image: z.file(),
    name: z.string().min(1),
    phone: z.string().min(1),
    division: z.string(),
    position: z.string().min(1)
})