import { User } from '@prisma/client';

export class Card {
  id?: string;
  vetor: number[];
  userID: string;
  roomID:string;
  createdAt: Date;
  updatedAt: Date;
}
