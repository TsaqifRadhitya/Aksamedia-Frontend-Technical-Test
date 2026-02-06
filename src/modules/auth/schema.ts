import z from "zod";

export const loginValidator = z.object({
    username : z.string().min(1),
    password : z.string().min(8)
});