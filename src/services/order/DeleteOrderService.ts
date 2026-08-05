import { prismaClient } from "../../prisma";

interface DeleteOrderServiceProps {
  order_id: string;
}

class DeleteOrderService {
  async execute({ order_id }: DeleteOrderServiceProps) {
    try {
      const orderExists = await prismaClient.order.findFirst({
        where: {
          id: order_id,
        },
      });

      if (!orderExists) {
        throw new Error("Pedido não encontrado.");
      }

      await prismaClient.order.delete({
        where: {
          id: order_id,
        },
      });

      return "Pedido deletado com sucesso!";
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }

      throw new Error("Falha ao deletar pedido.");
    }
  }
}

export { DeleteOrderService };
