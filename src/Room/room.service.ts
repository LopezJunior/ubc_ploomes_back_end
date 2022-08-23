import { Injectable } from '@nestjs/common';
import { Card, Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AwardUser } from 'src/Utils/award-utils';
import { CheckBingo } from 'src/Utils/checkBingo';
import { Compare } from 'src/Utils/compare';
import { CrossMap } from 'src/Utils/crossMap-util';
import { handleError } from 'src/Utils/handleError.utils';
import { PunishUser } from 'src/Utils/punishUser - util';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateRoomDto) {
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

  async checkBingo(user: User, cards: Card[], roomId: string) {
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
    });
    const prizeDraw = room.historic; // lista de bolas já sorteadas

    cards.forEach((card) => {
      const markedNumbers = card.markings; // Numeros marcados da cartela
      const cardNumbers = card.vetor;

      const prizeNumbers = Compare(prizeDraw, markedNumbers); // Numeros marcados corretamente

      const mapIndex = CrossMap(cardNumbers, prizeNumbers); // Indices das marcações válidas na cartela

      const KO = CheckBingo(mapIndex); // Boolean de validação do bingo

      if (KO) {
        AwardUser(user, room);
      } else {
        PunishUser(user);
      }
    });
  }

  async delete(id: string) {
    await this.prisma.room.delete({ where: { id } }).catch(handleError);
    return { message: 'Você saiu da partida!' };
  }
}
