import { User } from 'src/User/entities/user.entity';

export async function ValidTransaction(user: User) {
  const cardPrice = user.room.price;
  let validTransaction: boolean;

  if (user.wallet < cardPrice) {
    return (validTransaction = false);
  } else {
    return (validTransaction = true);
  }
}
