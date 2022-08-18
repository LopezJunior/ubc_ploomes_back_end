import { User } from '@prisma/client';

export class Card {
  id?: string;
  vetor: number[];
  userId: User;
  createdAt: Date;
  updatedAt: Date;
}
