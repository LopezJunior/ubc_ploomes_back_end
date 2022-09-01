import { ApiProperty } from '@nestjs/swagger';
import { Card } from 'src/card/entities/card.entity';
import { Room } from '../entities/room-entity';

export class checkBingoDto {
  @ApiProperty({
    description: 'Room ',
    example: {
      id: 'roomId',
      historic: [
        4, 3, 14, 11, 1, 21, 22, 25, 16, 19, 31, 45, 32, 38, 43, 54, 58, 46, 48,
        59, 64, 65, 62, 74, 63,
      ],
      price: 27,
    },
  })
  room: Room;

  @ApiProperty({
    description: 'Lista de cartelas, vetores e respectivas marcações',
    example: [
      {
        id: 'cardId',
        vetor: [
          7, 1, 14, 8, 5, 25, 29, 22, 16, 30, 42, 40, 41, 38, 35, 57, 58, 51,
          46, 52, 66, 62, 71, 75, 72,
        ],
        markings: [7, 40, 58, 46],
      },
      {
        id: 'cardId',
        vetor: [
          3, 8, 1, 15, 4, 28, 30, 20, 17, 16, 32, 43, 36, 42, 33, 49, 48, 51,
          53, 58, 62, 70, 74, 65, 73,
        ],
        markings: [16, 32, 74, 53, 58],
      },
      {
        id: 'cardId',
        vetor: [
          4, 3, 14, 11, 1, 21, 22, 25, 16, 19, 31, 45, 32, 38, 43, 54, 58, 46,
          48, 59, 64, 65, 62, 74, 63,
        ],
        markings: [4, 3, 14, 11, 1],
      },
    ],
  })
  cards: Card[];
}
