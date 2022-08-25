import { User } from '@prisma/client';

export async function ValidTransaction(user: User, cardPrice) {
 

  if (user.wallet < cardPrice) {
    return false;
  } else {
    return true;
  }
}
