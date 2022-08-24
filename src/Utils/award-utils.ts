import { Room } from 'src/Room/entities/room-entity';

export async function AwardUser(room: Room, totalCards: number) {
  const countUsers = room.users.length;

  if (countUsers < 2) {
    return room.price * 5;
  } else {
    return totalCards * room.price;
  }
}
