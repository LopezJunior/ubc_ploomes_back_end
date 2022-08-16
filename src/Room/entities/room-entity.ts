import { User } from 'src/User/entities/user.entity';

export class Room {
  id?: string;
  number: number;
  userID?: User[];
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
