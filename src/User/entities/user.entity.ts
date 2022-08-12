//import { Card } from "src/Card/entities/card.entity";
//import { Room } from "src/Room/entities/room.entity";

export class User {
  id?: string;
  number?:number;  
  userID: User [];  
  maxCards?:number;  
  limitPrizeDraw?:number;  
  limitRecord?:number;  
  //rules: enum;  
  limitUsers?:number;  
  historic: number [];  
  frequency?: number;  
  createdAt?: Date;
  updatedAt?: Date;
}
