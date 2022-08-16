//import { Card } from "src/Card/entities/card.entity";

export class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  wallet?: number;
  matches?: number;
  wins?: number;
  withdraws?: number;
  //cards:Card[];
  roomID?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
