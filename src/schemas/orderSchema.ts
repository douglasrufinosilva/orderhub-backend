import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    table: z.int({ message: "O número da mesa deve ser um número inteiro." }),
    name: z.string().optional(),
  }),
});
