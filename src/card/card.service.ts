import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/User/entities/user.entity';
import { CreateCard } from 'src/Utils/createCard-utils';
import { handleError } from 'src/Utils/handleError.utils';

@Injectable()
export class CardService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User) {
    const generateCard = CreateCard();

    const priceCard = await this.prisma.user.findUnique({
      where: { id: user.id },
      select: { room: { select: { price: true } } },
    });
    // let cards = await this.prisma.user.findUnique({
    //   where: { id: user.id },
    //   select: { cards: true },
    // });

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        wallet: user.wallet - priceCard.room.price,
      },
    });

    const data: Prisma.CardCreateInput = {
      user: {
        connect: {
          id: user.id,
        },
      },
      vetor: generateCard,
    };

    return this.prisma.card
      .create({
        data,
        select: {
          user: {
            select: {
              name: true,
            },
          },
          vetor: true,
        },
      })
      .catch(handleError);
  }

  async remove(id: string) {
    return this.prisma.card.delete({ where: { id: id } });
  }
}
