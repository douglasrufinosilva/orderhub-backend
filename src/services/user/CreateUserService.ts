import { prismaClient } from "../../prisma";
import { hash } from "bcryptjs";

interface CreateUserProps {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: CreateUserProps) {
    const normalizedEmail = email.trim().toLocaleLowerCase();

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: normalizedEmail,
      },
    });

    if (userAlreadyExists) {
      throw new Error("Usuário já existente!");
    }

    const passwordHash = await hash(password, 10);

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: normalizedEmail,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  }
}

export { CreateUserService };
