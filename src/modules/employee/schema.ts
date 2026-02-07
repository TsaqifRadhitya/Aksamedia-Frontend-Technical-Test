import z from "zod";

export const EmployeeValidator = z.object({
    image: z.file(),
    name: z.string().min(1),
    phone: z.string().min(1),
    division_id: z.string(),
    position: z.string().min(1)
})