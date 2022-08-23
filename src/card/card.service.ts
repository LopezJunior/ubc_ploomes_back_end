import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Prisma} from '@prisma/client';
import { User } from 'src/User/entities/user.entity';
import { Room} from 'src/Room/entities/room-entity';
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
    
    let cards = await this.prisma.user.findUnique({where:{id:user.id},select:{cards:true}});
    
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
