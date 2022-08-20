import { User } from "src/User/entities/user.entity";
import { Room } from "src/Room/entities/room-entity";

export class Card {
  id?: string;
  vetor: number[];
  user: User;
  room:Room;
  createdAt: Date;
  updatedAt: Date;
}
