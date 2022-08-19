import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateRoomDto) {
    const data: Prisma.RoomCreateInput = {
      number: dto.number,
      maxCards: dto.maxCards,
      limitPrizeDraw: dto.limitPrizeDraw,
      limitRecord: dto.limitRecord,
      limitUsers: dto.limitUsers,
      price: dto.price,
      historic: dto.historic,
      frequency: dto.frequency,
    };

    return this.prisma.room.create({ data }); //.catch(handleError);
  }

  findAll() {
    return `This action returns all folderName`;
  }

  findOne(id: string) {
    return this.prisma.room.findUnique({ where: { id: id } });
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} folderName`;
  }

  async resetRoom(id:string,user:User) {

    const room = await this.prisma.room.findUnique({where:{id:id}});

    let refreshHistoric=[];
    let ref = 2;
  
    const data: Prisma.RoomUpdateInput = {
      historic:ref,
      users:{
        connect:{

        }
      }
    };

    return this.prisma.room.update({where:{id:id},data})
  }
  

  remove(id: number) {
    return `This action removes a #${id} folderName`;
  }
}
