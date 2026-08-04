import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    table: z.int({ message: "O número da mesa deve ser um número inteiro." }),
    name: z.string().optional(),
  }),
});

export const detailOrderSchema = z.object({
  query: z.object({
    order_id: z
      .string("O ID do pedido deve ser uma string.")
      .min(1, "O order_id é obrigatório."),
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

export const sendOrderSchema = z.object({
  body: z.object({
    name: z.string("O nome precisa ser um texto."),
    order_id: z
      .string("O ID do produto precisa ser uma string.")
      .min(1, "O order_id é obrigatório."),
  }),
});
