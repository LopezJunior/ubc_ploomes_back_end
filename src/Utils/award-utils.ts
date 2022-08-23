import { User } from 'src/User/entities/user.entity';

export async function AwardUser(winner: User, totalCards: number) {
  const countUsers = winner.room.users.length;
  let winnerWallet = winner.wallet;

  if (countUsers < 2) {
    return (winnerWallet += 50);
  } else {
    return (winnerWallet += totalCards * winner.room.price);
  }
}
