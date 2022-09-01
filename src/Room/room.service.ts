import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { CardService } from 'src/card/card.service';
import { PrismaService } from 'src/prisma/prisma.service';
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
    const roomList = await this.prisma.room.findMany().catch(handleError);

    // Função usada para gerar um número para a sala
    let numberGenerate = 1;

    for (let x = 0; x < roomList.length; x++) {
      if (roomList[x].number == numberGenerate) {
        numberGenerate++;
        x = 0;
      }
    }

    const data: Prisma.RoomCreateInput = {
      number: numberGenerate,
      maxCards: dto.maxCards,
      limitPrizeDraw: dto.limitPrizeDraw,
      limitRecord: dto.limitRecord,
      limitUsers: dto.limitUsers,
      price: 10 * dto.maxCards,
      frequency: dto.frequency,
      historic: [],
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

    const cardPrice = room.price;

    // Verifica se o usuário tem dinheiro suficiente
    let validTransaction;

    if (user.wallet < cardPrice) {
      validTransaction = false;
    } else {
      validTransaction = true;
    }

    if (validTransaction === false) {
      await this.prisma.room
        .delete({ where: { id: room.id } })
        .catch(handleError);
      return { message: 'Saldo insuficiente' }; // parar o código aqui!
    } else {
      await this.prisma.user
        .update({
          where: { id: user.id },
          data: {
            wallet: {
              decrement: data.price,
            },
          },
        })
        .catch(handleError);
      //
      const cards = [];
      if (data.maxCards == 1) {
        cards.push(await this.cardService.create(user).catch(handleError));
        return { room, cards };
      } else {
        for (let x = 0; x < data.maxCards; x++) {
          cards.push(await this.cardService.create(user).catch(handleError));
        }
        return { room, cards };
      }
    }
  }

  async findById(id: string) {
    return this.prisma.room
      .findUnique({ where: { id: id } })
      .catch(handleError);
  }

  async resetRoom(user: User) {
    await this.prisma.card
      .deleteMany({ where: { userID: user.id } })
      .catch(handleError);

    const room = await this.prisma.user
      .findUnique({
        where: { id: user.id },
        select: { room: true },
      })
      .catch(handleError);

    const data = await this.prisma.room
      .findUnique({
        where: { id: room.room.id },
      })
      .catch(handleError);

    await this.prisma.room
      .delete({ where: { id: room.room.id } })
      .catch(handleError);

    return await this.create(user, data).catch(handleError);
  }

  async checkBingo(user: User, dto: checkBingoDto) {
    const room = dto.room;
    const cards = dto.cards;
    const prizeDraw = dto.room.historic; // lista de bolas já sorteadas
    let KO: boolean; // KnockOut, variável da vitória

    if (cards.length > 0) {
      for (let x = 0; x < cards.length; x++) {
        const card = cards[x];

        const markedNumbers = card.markings; // Numeros marcados da cartela

        const cardNumbers = card.vetor;

        const prizeNumbers = Compare(prizeDraw, markedNumbers); // Numeros marcados corretamente

        const mapIndex = CrossMap(cardNumbers, prizeNumbers); // Indices das marcações válidas na cartela

        KO = CheckBingo(mapIndex); // Boolean de validação do bingo

        if (KO) {
          user.wallet += room.price * 5;

          const data: Prisma.UserUpdateInput = user;

          await this.prisma.user
            .update({ data, where: { id: user.id } })
            .catch(handleError); // Atualiza no banco

          await this.prisma.card
            .deleteMany({ where: { id: user.id } })
            .catch(handleError);

          await this.prisma.room
            .delete({ where: { id: room.id } })
            .catch(handleError);

          return { KO, user, room, card };
        }
      }
    } else {
      KO = false;
    }
    if (!KO) {
      const cards = await this.prisma.card
        .findMany({
          // Pega todas as cartelas do usuário
          where: { userID: user.id },
        })
        .catch(handleError);

      if (cards.length < 2) {
        // Se o usuário tiver apenas uma cartela
        return { KO, user, room };
      } else {
        const deletedCardId = PunishUser(cards); // função que escolhe uma cartela para deletar

        await this.prisma.card
          .delete({ where: { id: deletedCardId } })
          .catch(handleError); // deleta a cartela escolhida.

        return { KO, deletedCardId, cards, user, room };
      }
    }
  }

  async endGame(userId: string, roomId: string) {
    await this.prisma.card
      .deleteMany({ where: { id: userId } })
      .catch(handleError);

    await this.prisma.room.delete({ where: { id: roomId } }).catch(handleError);
  }
}
