import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Prisma} from '@prisma/client';
import { User } from 'src/User/entities/user.entity';
import { userInfo } from 'os';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { CardService } from './card.service';


@ApiTags('Cards')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  //@Post()
  //create(@LoggedUser() user:User) {
  //  return this.cardService.create(user);}

  //@Delete(':id')
  //remove(@LoggedUser() user:User,@Param('id') id:string) {
  //  return this.cardService.remove(user,id);
  //}
}
