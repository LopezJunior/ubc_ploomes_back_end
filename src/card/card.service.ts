import { HttpException, Injectable } from '@nestjs/common';
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
              id: true,
            },
          },
          id: true,
          vetor: true,
        },
      })
      .catch(handleError);
  }

  async remove(userID: string) {
    const userCards = await this.prisma.user.findUnique({where:{id:userID},select:{cards:true}});

    const y = Math.ceil(Math.random() * userCards.cards.length); 
    await this.prisma.card.delete({ where: { id:userCards.cards[y].id} });
    throw new HttpException('Card deletado com sucesso!', 200);     
  }
}
