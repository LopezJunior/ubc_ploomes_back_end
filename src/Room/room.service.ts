import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CardService } from 'src/card/card.service';
import { Card } from 'src/card/entities/card.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/User/entities/user.entity';
import { AwardUser } from 'src/Utils/award-utils';
import { CheckBingo } from 'src/Utils/checkBingo';
import { Compare } from 'src/Utils/compare';
import { CrossMap } from 'src/Utils/crossMap-util';
import { handleError } from 'src/Utils/handleError.utils';
import { PunishUser } from 'src/Utils/punishUser - util';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomService {
  CardService: any;
  constructor(
    private readonly prisma: PrismaService,
    private readonly cardService: CardService,
  ) {}

  async create(user: User, dto: CreateRoomDto) {
    const roomList = await this.prisma.room.findMany();
    let numberGenerate = 1;

    for (let x = 0; x < roomList.length; x++) {
      if (roomList[x].number == numberGenerate) {
        numberGenerate++;
        x--;
      }
    }

    const data: Prisma.RoomCreateInput = {
      number: numberGenerate,
      maxCards: dto.maxCards,
      limitPrizeDraw: dto.limitPrizeDraw,
      limitRecord: dto.limitRecord,
      limitUsers: dto.limitUsers,
      price: dto.price,
      frequency: dto.frequency,
      users: {
        connect: {
          id: user.id,
        },
      },
    };

    const room = await this.prisma.room.create({ data }).catch(handleError);
    const card = await this.cardService.create(user);

    return { room, card };
  }

  async findById(id: string) {
    return this.prisma.room.findUnique({ where: { id: id } });
  }

  async resetRoom(user: User) {
    await this.prisma.card.deleteMany({ where: { userID: user.id } });

    const room = await this.prisma.user.findUnique({
      where: { id: user.id },
      select: { room: true },
    });

    const data = await this.prisma.room.findUnique({
      where: { id: room.room.id },
    });

    await this.prisma.room.delete({ where: { id: room.room.id } });

    return await this.create(user, data);
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

      // if (KO) {
      //   AwardUser(user); // , room);
      // } else {
      //   PunishUser(user);
      // }
    });
  }

  async delete(id: string) {
    await this.prisma.room.delete({ where: { id: id } }).catch(handleError);
    return { message: 'Você saiu da partida!' };
  }
}
