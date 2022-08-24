import { User } from "src/User/entities/user.entity";


export async function ValidTransaction(user:User,cardPrice:number){

  if (user.wallet < cardPrice) {
    return  false;    
  } else {
    return  true;
  }
}
