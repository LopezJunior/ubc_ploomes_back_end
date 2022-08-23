import { Injectable } from '@nestjs/common';
import { Prisma,Room} from '@prisma/client';
import { User } from 'src/User/entities/user.entity';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { CreateCard } from 'src/Utils/createCard-utils';
import { handleError } from 'src/Utils/handleError.utils';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CardService {
  delete(id: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly prisma: PrismaService) {}

   async create(user:User) {
    
    let generateCard = CreateCard();
    
    const priceCard = await this.prisma.user.findUnique({where:{id:user.id},select:{room:{select:{price:true}}}});
    let cards = await this.prisma.user.findUnique({where:{id:user.id},select:{cards:true}});

    await this.prisma.user.update({
      where:{id:user.id},
      data:{
        wallet: user.wallet - priceCard.room.price
      }
    });

    const data: Prisma.CardCreateInput = {
      user:{
        connect:{
          id:user.id
        }
      }, 
      vetor:generateCard,
    };

    return this.prisma.card.create({
      data,
      select: {
      user:{
        select:{
          name:true,
        }
      },
      vetor:true
      }
    }).catch(handleError);
  }


  async remove(id:string) {
    return this.prisma.card.delete({where:{id:id}});
  }
}
