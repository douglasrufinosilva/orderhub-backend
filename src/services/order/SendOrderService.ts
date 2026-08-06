import { prismaClient } from "../../prisma";

interface SendOrderServiceProps {
  name: string;
  order_id: string;
}

class SendOrderSevice {
  async execute({ name, order_id }: SendOrderServiceProps) {
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
          draft: false,
          name: name,
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
      throw new Error("Falha ao enviar pedido.");
    }
  }
}

export { SendOrderSevice };
