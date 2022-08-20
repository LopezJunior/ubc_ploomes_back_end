import { Injectable } from '@nestjs/common';
import { Prisma, Room, User } from '@prisma/client';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { CreateCard } from 'src/Utils/createCard-utils';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { handleError } from 'src/Utils/handleError.utils';
import { PrismaService } from 'src/prisma/prisma.service';
import { Room } from 'src/Room/entities/room-entity';

@Injectable()
export class CardService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto:CreateCardDto,user:User) {
    let card = []
    CreateCard(card)

    const price = await this.prisma.room.findUnique({
      where:{id:user.id},
      select:{id:user.roomID}
    })

    await this.prisma.user.update({
      where:{id:user.id},
      data:{
        wallet:
      }
    })

    const data: Prisma.CardCreateInput = {
      user:{
        connect:{
          id:user.id
        }
      },      
      vetor:card,
    };

    return this.prisma.card.create({
      data,
      select: {
        vetor:true,
      user:{
        select:{
          id:true
        }
      }
      },
    }).catch(handleError);
  }

  findAll() {
    return `This action returns all card`;
  }

  findOne(id: number) {
    return `This action returns a #${id} card`;
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
