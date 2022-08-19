import { PrismaService } from 'src/prisma/prisma.service';
import { Room } from 'src/Room/entities/room-entity';
import { User } from 'src/User/entities/user.entity';


export async function Award(user:User,room:Room){
    
    const countUsers = room.users.length; // numero de jogadores
    const userIdList = room.users; // id de todos os usuários
    const userPayCards = user.cards.length * room.price;// Pagamento cartelas
    let totalCards = 0;

    // Para contar todos os cards da Room
    for(let x=0 ; x<countUsers ; x++){
      let recordUser = await PrismaService.user.findUnique({where:{id:userIdList[0]}});
      totalCards += recordUser.cards.length; 
    }

  if (countUsers < 2) {
    await this.PrismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        wallet: user.wallet + 50 - userPayCards,
      },
    });
  } else {
    await this.PrismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        wallet: user.wallet + totalCards * room.price,
      },
    });
  }
}
