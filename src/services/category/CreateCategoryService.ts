import { prismaClient } from "../../prisma";

interface CreateCategoryProps {
  name: string;
}

class CreateCategoryService {
  async execute({ name }: CreateCategoryProps) {
    try {
      const normalizedName = name.trim().toLocaleLowerCase();

      const categoryAlreadyExists = await prismaClient.category.findFirst({
        where: {
          name: normalizedName,
        },
      });

      if (categoryAlreadyExists) {
        throw new Error("A categoria já existe.");
      }

      const category = await prismaClient.category.create({
        data: {
          name: normalizedName,
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      });

      return category;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Falha ao criar categoria.");
    }
  }
}

export { CreateCategoryService };
