import { prismaClient } from "../../prisma";

interface FinishOrderServiceProps {
  order_id: string;
}

class FinishOrderService {
  async execute({ order_id }: FinishOrderServiceProps) {
    try {
      const orderExists = await prismaClient.order.findFirst({
        where: {
          id: order_id,
        },
      });

      if (!orderExists) {
        throw new Error("Pedido não encontrado.");
      }

      const updateOrder = await prismaClient.order.update({
        where: {
          id: order_id,
        },
        data: {
          status: true,
        },
        select: {
          id: true,
          table: true,
          name: true,
          draft: true,
          status: true,
          createdAt: true,
        },
      });

      return updateOrder;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Falha ao finalizar pedido.");
    }
  }
}

export { FinishOrderService };
