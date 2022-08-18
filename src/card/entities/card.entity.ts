import { User } from "@prisma/client";

export class Card {
    id?: string;
    vetor:number[];
    userID:String;
    createdAt:Date;
    updatedAt:Date;
}
