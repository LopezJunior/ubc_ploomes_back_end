import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { CardService } from 'src/card/card.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AwardUser } from 'src/Utils/award-utils';
import { CheckBingo } from 'src/Utils/checkBingo';
import { Compare } from 'src/Utils/compare';
import { CrossMap } from 'src/Utils/crossMap-util';
import { handleError } from 'src/Utils/handleError.utils';
import { PrizeDraw } from 'src/Utils/prizeDraw-util';
import { PunishUser } from 'src/Utils/punishUser - util';
import { checkBingoDto } from './dto/checkBingo.dto';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cardService: CardService,
  ) {}

  async create(user: User, dto: CreateRoomDto) {
    const roomList = await this.prisma.room.findMany();

    // Função usada para gerar um número para a sala
    let numberGenerate = 1;

    for (let x = 0; x < roomList.length; x++) {
      if (roomList[x].number == numberGenerate) {
        numberGenerate++;
        x--;
      }
    }

    //

    const data: Prisma.RoomCreateInput = {
      number: numberGenerate,
      maxCards: dto.maxCards,
      limitPrizeDraw: dto.limitPrizeDraw,
      limitRecord: dto.limitRecord,
      limitUsers: dto.limitUsers,
      price: 10 * dto.maxCards,
      frequency: dto.frequency,
      users: {
        connect: {
          id: user.id,
        },
      },
    };

    data.prizeOrder = PrizeDraw(data.limitPrizeDraw);

    // Const room necessária para acessar o valor do card
    const room = await this.prisma.room.create({ data }).catch(handleError);
    //

    // const cardPrice = await this.prisma.room.findUnique({
    //   where: { id: room.id },
    //   select: {
    //     price: true,
    //   },
    // });

    // Verifica se o usuário tem dinheiro suficiente
    // const validTransaction = await ValidTransaction(user);

    if (validTransaction === false) {
      await this.prisma.room
        .delete({ where: { id: room.id } })
        .catch(handleError);
      return { message: 'Saldo insuficiente' }; // parar o código aqui!
    } else {
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          wallet: {
            decrement: data.price,
          },
        },
      });
      //

      if (data.maxCards == 1) {
        await this.cardService.create(user);
      } else {
        for (let x = 0; x < data.maxCards; x++) {
          await this.cardService.create(user);
        }
      }
    }
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

  async checkBingo(user: User, dto: checkBingoDto) {
    // const room = await this.prisma.room.findUnique({
    //   where: { id: roomId },
    //   include: { users: true },
    // });
    const room = dto.room;
    const cards = dto.cards;
    const prizeDraw = dto.room.historic; // lista de bolas já sorteadas

    cards.forEach(async (card) => {
      const markedNumbers = card.markings; // Numeros marcados da cartela
      const cardNumbers = card.vetor;

      const prizeNumbers = Compare(prizeDraw, markedNumbers); // Numeros marcados corretamente

      const mapIndex = CrossMap(cardNumbers, prizeNumbers); // Indices das marcações válidas na cartela

      const KO = CheckBingo(mapIndex); // Boolean de validação do bingo

      if (KO) {
        const countUsers = room.users.length;
        let totalCards = 0;
        const userIdList = room.users;

        for (let x = 0; x < countUsers; x++) {
          const recordUser = await PrismaService.user.findUnique({
            where: { id: userIdList[0].id },
          });
          totalCards += recordUser.cards.length;
        }

        const roomPrize = await AwardUser(room, totalCards); // , room);
        user.wallet += roomPrize;

        const data: Prisma.UserUpdateInput = user;

        this.prisma.user.update({ data, where: { id: user.id } });

        return {
          message: `O ${user.name} foi o campeão da rodada por KnockOut!`,
        };
      } else {
        const cards = await this.prisma.card.findMany({
          where: { userID: user.id },
        });

        const deletedCardId = PunishUser(cards);

        await this.prisma.card.delete({ where: { id: deletedCardId } });

        return { message: `${user.name} declarou bingo em falso!` };
      }
    });
  }

  async delete(id: string) {
    await this.prisma.room.delete({ where: { id: id } }).catch(handleError);
    return { message: 'Você saiu da partida!' };
  }
}
