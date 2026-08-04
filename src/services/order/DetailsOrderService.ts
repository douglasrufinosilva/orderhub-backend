import { prismaClient } from "../../prisma";

interface DetailsOrderServiceProps {
  order_id: string;
}

class DetailsOrderService {
  async execute({ order_id }: DetailsOrderServiceProps) {
    try {
      const order = await prismaClient.order.findFirst({
        where: {
          id: order_id,
        },
        select: {
          id: true,
          name: true,
          table: true,
          draft: true,
          status: true,
          createdAt: true,
          items: {
            select: {
              id: true,
              amount: true,
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  description: true,
                  banner: true,
                },
              },
            },
          },
        },
      });

      if (!order) {
        throw new Error("Pedido não encontrado!");
      }

      return order;
    } catch (error) {
      throw new Error("Não foi possível obter os detalhes do pedido.");
    }
  }
}

export { DetailsOrderService };
