import { Injectable, Redirect } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/User/entities/user.entity';
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

  async delete(id: string) {
    await this.prisma.room.delete({where: {id}});
    return {message: 'Você saiu da partida!'};
  }
}
