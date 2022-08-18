import { User } from "src/User/entities/user.entity";
import { Room } from "src/Room/entities/room-entity";
import { Prisma } from '@prisma/client';
import { PrismaService } from "src/prisma/prisma.service";
import { type } from "os";

export async function Award(user:User,room:Room){

    //Geral
    const countUsers = room.users.length; // numero de jogadores
    const userIdList = room.users; // id de todos os usuários
    let totalCards = 0; // numero total de cards

    // Todos os cards da Room
    for(let x=0 ; x<countUsers ; x++){
        let recordUser = await this.PrismaService.user.findUnique({where:{id:userIdList[0]}});
        totalCards += recordUser.cards.length; 
    }
    
    //solo
    //const data: Partial<User> = { ...updateUserDto };
    //Multiplayer

    if(countUsers<2){
        await this.PrismaService.user.update({
            where: {
              id:user.id,
            },
            user:{
                wallet: user.wallet + 50 - (user.cards.length * room.price)
            }

          });

    }else{

        await this.PrismaService.user.update({
            where: {
              id:user.id,
            },
            user:{
                wallet: user.wallet + totalCards * countUsers
            }

          });


    }
}

    
    


