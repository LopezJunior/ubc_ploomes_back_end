import { User } from 'src/User/entities/user.entity';
import { Card } from 'src/card/entities/card.entity';

export class Room {
  id?: string;
  number: number;
  users?: User[];
  cards?:Card[];
  maxCards?: number;
  limitPrizeDraw?: number;
  limitRecord?: number;
  limitUsers?: number;
  price?: number;
  //rules enum
  historic?: number[];
  frequency?: number;
  createdAt: Date;
  updatedAt: Date;
}
