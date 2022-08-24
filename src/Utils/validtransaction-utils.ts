import { User } from '@prisma/client';

export async function ValidTransaction(user: User) {
  const cardPrice = user.room.price;
  let validTransaction: boolean;

  if (user.wallet < cardPrice) {
    return  false;    
  } else {
    return  true;
  }
}
