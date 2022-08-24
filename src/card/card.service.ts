import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { User } from 'src/User/entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
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

    return this.prisma.card.create({
      data,
      select: {
      user:{
        select:{
          name:true,
        }
      },
      id:true,
      vetor:true
      }
    }).catch(handleError);
  }


  async remove(user:User,id:string) {
    
    const room = await this.prisma.user.findUnique({
      where:{id:user.id},
      select:{room:true}
    });

    const reversalValue = await this.prisma.room.findUnique({
      where:{id:room.room.id},
      select:{price:true}
    });
    
    await this.prisma.user.update({
      where:{id:user.id},
      data:{
        wallet:{
          increment:reversalValue.price
        }
      }
    });

    return this.prisma.card.delete({where:{id:id}});

  }
}
