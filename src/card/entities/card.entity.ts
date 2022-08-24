import { User } from '@prisma/client';

export class Card {
  id?: string;
  vetor: number[];
  markings?: number[];
  userId: User;
  createdAt?: Date;
  updatedAt?: Date;
}
