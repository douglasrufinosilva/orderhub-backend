import { prismaClient } from "../../prisma";
import cloudinary from "../../config/cloudinary";
import { Readable } from "stream";
import { number } from "zod";

interface CreateProductServiceProps {
  name: string;
  price: number;
  description: string;
  category_id: string;
  imageBuffer: Buffer;
  imageName: string;
}

class CreateProductService {
  async execute({
    name,
    price,
    description,
    category_id,
    imageBuffer,
    imageName,
  }: CreateProductServiceProps) {
    const categoryExists = await prismaClient.category.findFirst({
      where: {
        id: category_id,
      },
    });

    if (!categoryExists) {
      throw new Error("Categoria não encontrada.");
    }

    // Caso a imagem seja enviado...
    // 1 - Enviar a imagem pro CLOUDINARY salvar e pegar a url...
    let bannerUrl = "";

    try {
      const result = await new Promise<any>((resolve, reject) => {
        const uploadstream = cloudinary.uploader.upload_stream(
          {
            folder: "products",
            resource_type: "image",
            public_id: `${Date.now()}-${imageName.split(".")[0]}`,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );

        // Criar o stream do buffer e fazer o pipe para o cloudinary
        const bufferStream = Readable.from(imageBuffer);
        bufferStream.pipe(uploadstream);
      });

      bannerUrl = result.secure_url;
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao fazer o upload da imagem.");
    }
    // 2 - Salvar a url da imagem e os dados no banco como um novo produto...

    const product = await prismaClient.product.create({
      data: {
        name,
        price,
        description,
        banner: bannerUrl,
        category_id,
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        category_id: true,
        banner: true,
        createdAt: true,
      },
    });

    return product;
  }
}

export { CreateProductService };
