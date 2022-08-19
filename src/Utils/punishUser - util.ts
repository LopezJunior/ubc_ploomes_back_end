import { PrismaService } from 'src/prisma/prisma.service';

async function PunishUser(user) {
  const cards = user.cards.length(); // descobre quantas cartelas o jogador possui e usa como limite

  const index = Math.floor(Math.random() * cards); // limite definindo abrangência do random, devolvendo um índice

  const id = user.cards[index].id;

  await this.PrismaService.card.delete({ where: id }); // Deleta uma cartela randômica

  return { message: `${user.name} declarou bingo em falso!` };
}
