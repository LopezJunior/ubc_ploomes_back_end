import { Card } from 'src/card/entities/card.entity';
import { Room } from '../entities/room-entity';

export class checkBingoDto {
  room: Room;
  cards: Card[];
}
