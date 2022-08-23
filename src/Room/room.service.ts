import { Injectable, Param } from '@nestjs/common';
import { Prisma} from '@prisma/client';
import { User } from 'src/User/entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/Utils/handleError.utils';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { match } from 'assert';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { Room } from './entities/room-entity';
import { CardService } from 'src/card/card.service';

@Injectable()
export class RoomService {
  CardService: any;
  constructor(private readonly prisma: PrismaService,private readonly cardService: CardService) {}

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

    const room = await this.prisma.room.create({ data }).catch(handleError);
    const card = await this.cardService.create(user);

    return {room,card};
  }

  async findById(id:string){
    return this.prisma.room.findUnique({where:{id:id}});
  }

  async resetRoom(user: User) {
    await this.prisma.card.deleteMany({ where: { userID: user.id }});

    const room = await this.prisma.user.findUnique({where:{id:user.id},select:{room:true}});

    const data = await this.prisma.room.findUnique({
      where: {id:room.room.id}
    });

    await this.prisma.room.delete({ where: { id:room.room.id} });

    return this.create(user,data);
  }
  
  async delete(id: string) {
    await this.prisma.room.delete({ where: { id:id } }).catch(handleError);
    return { message: 'Você saiu da partida!' };
  }
}
