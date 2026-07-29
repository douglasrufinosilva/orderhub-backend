import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    table: z.int({ message: "O número da mesa deve ser um número inteiro." }),
    name: z.string().optional(),
  }),
});

export const addItemSchema = z.object({
  body: z.object({
    order_id: z
      .string("O pedido deve ser uma string.")
      .min(1, "O pedido deve ser obrigatório."),
    product_id: z
      .string("O produto deve ser uma string.")
      .min(1, "O produto deve ser obrigatório."),
    amount: z
      .number()
      .int("A quantidade deve ser um número inteiro.")
      .positive("Quantidade deve ser um número positivo."),
  }),
});

export const removeItemSchema = z.object({
  query: z.object({
    item_id: z
      .string("O item_id deve ser uma string.")
      .min(1, "O item_id é obrigatório."),
  }),
});
