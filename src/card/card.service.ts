import { Injectable } from '@nestjs/common';
import { Prisma,User,Room} from '@prisma/client';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { CreateCard } from 'src/Utils/createCard-utils';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { handleError } from 'src/Utils/handleError.utils';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CardService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto:CreateCardDto,user:User) {
    
    let generateCard = CreateCard();

    let room = await this.prisma.room.findUnique({where:{id:user.roomID}});
    let cards = await this.prisma.user.findUnique({where:{id:user.id},select:{cards:true}});

    const payCards = room.price * cards.cards.length;

    await this.prisma.user.update({
      where:{id:user.id},
      data:{
        wallet: user.wallet - payCards
      }
    });

    const data: Prisma.CardCreateInput = {
      user:{
        connect:{
          id:user.id
        }
      }, 
      room:{
        connect:{
          id:user.roomID
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
      room:{
        select:{
          number:true,
        }
      },
      vetor:true
      }
    }).catch(handleError);
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id:string) {
    return this.prisma.card.delete({where:{id:id}});
  }
}
