import { Injectable, Param } from '@nestjs/common';
import { Prisma} from '@prisma/client';
import { User } from 'src/User/entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/Utils/handleError.utils';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { match } from 'assert';
import { LoggedUser } from 'src/auth/logged-user.decorator';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user:User, dto: CreateRoomDto) {

    let roomList = await this.prisma.room.findMany();
    let numberGenerate = 1;   

    for(let x = 0 ; x < roomList.length ; x++){

      if(roomList[x].number == numberGenerate){
        numberGenerate++;
        x--;
      }
    }
 
    const data: Prisma.RoomCreateInput = {
      number:numberGenerate,
      maxCards: dto.maxCards,
      limitPrizeDraw: dto.limitPrizeDraw,
      limitRecord: dto.limitRecord,
      limitUsers: dto.limitUsers,
      price: dto.price,
      frequency: dto.frequency,
      users:{
        connect:{
          id:user.id
        }
      }
    };

    return this.prisma.room.create({ data }).catch(handleError);
  }

  async resetRoom(id: string, userID: string) {
    await this.prisma.card.deleteMany({ where: { id: userID } });

    const data = await this.prisma.room.findUnique({
      where: { id: id },
      select: {
        number: true,
        maxCards: true,
        limitPrizeDraw: true,
        limitRecord: true,
        limitUsers: true,
        price: true,
        frequency: true,
        users:{
         select:{
          id:true,
          name:true
         }
        }
      },
    });

    await this.prisma.room.delete({ where: { id: id } });

    return this.prisma.room.create({ data }).catch(handleError);
  }
  
  async delete(id: string) {
    await this.prisma.room.delete({ where: { id } }).catch(handleError);
    return { message: 'Você saiu da partida!' };
  }
}
