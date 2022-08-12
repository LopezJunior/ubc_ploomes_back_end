//import { Card } from "src/Card/entities/card.entity";
//import { Room } from "src/Room/entities/room.entity";

export class User {
  id?: string;
  name:string;
  email:string;
  password:string;
  wallet?:number;
  matches?:number;
  wins?:Number;
  withdraws?:number;
  //cards:Card[];
  //room?: Room;
  createdAt?: Date;
  updatedAt?: Date;
}
