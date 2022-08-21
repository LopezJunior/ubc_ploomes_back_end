import { Injectable, Param } from '@nestjs/common';
import { Prisma} from '@prisma/client';
import { User } from 'src/User/entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/Utils/handleError.utils';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { UsersService } from 'src/User/users.service';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRoomDto) {
    const data: Prisma.RoomCreateInput = {
      maxCards: dto.maxCards,
      limitPrizeDraw: dto.limitPrizeDraw,
      limitRecord: dto.limitRecord,
      limitUsers: dto.limitUsers,
      price: dto.price,
      frequency: dto.frequency,
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
        users: true,
      },
    });

    await this.prisma.room.delete({ where: { id: id } });

    this.create(data);

    return data;
  }
  
  async delete(id: string) {
    await this.prisma.room.delete({ where: { id } }).catch(handleError);
    return { message: 'Você saiu da partida!' };
  }
}
