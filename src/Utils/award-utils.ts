import { User } from "src/User/entities/user.entity";
import { PrismaService } from "src/prisma/prisma.service";


//Função que recebe 3 parâmetros, o vencedor, o número de cartelas(custo de 10pt por cartela) e 
// Atribuir o prêmio da partida - o desconto das cartelas

export async function Award(user:User,award:number,cardValue:number){

    //const priceCards = cardValue + user.cards.lenght
    //const finalAward = award - priceCards; 

    return await this.PrismaService.user.update({
        where:{id:user.id},
        data:{
            wallet: user

        }
    }); 
    
}