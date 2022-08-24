import { Card } from '@prisma/client';

export function PunishUser(cards: Card[]): string {
  const totalCards = cards.length; // descobre quantas cartelas o jogador possui e usa como limite

  const index = Math.floor(Math.random() * totalCards); // limite definindo abrangência do random, devolvendo um índice

  const deletedCardId = cards[index].id;

  return deletedCardId;
}
