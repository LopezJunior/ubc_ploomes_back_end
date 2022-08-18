import { PrismaService } from 'src/prisma/prisma.service';

async function PunishUser(userCards) {
  const cards = userCards.length(); // descobre quantas cartelas o jogador possui e usa como limite

  const index = Math.floor(Math.random() * cards); // limite definindo abrangência do random, devolvendo um índice

  const id = userCards[index].id;

  return await this.PrismaService.card.delete({ where: id }); // Deleta uma cartela randômica
}
