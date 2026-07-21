import { prismaClient } from "../../prisma";

interface DeleteProductServideProps {
  product_id: string;
}

class DeleteProductServide {
  async execute({ product_id }: DeleteProductServideProps) {
    try {
      await prismaClient.product.update({
        where: {
          id: product_id,
        },
        data: {
          disabled: true,
        },
      });

      return { message: "Produto deletado/arquivado com sucesso." };
    } catch (error) {
      throw new Error("Não foi possível deletar o produto.");
    }
  }
}

export { DeleteProductServide };
