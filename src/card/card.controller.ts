 import { Controller, Delete, Post, UseGuards } from '@nestjs/common';
 import { AuthGuard } from '@nestjs/passport';
 import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
 import { LoggedUser } from 'src/auth/logged-user.decorator';
 import { User } from 'src/User/entities/user.entity';
 import { CardService } from './card.service';

 @ApiTags('Card')
 @UseGuards(AuthGuard())
 @ApiBearerAuth()
 @Controller('Card')
 export class CardController {
   constructor(private readonly cardService: CardService) {}

   @ApiOperation({
     summary: 'Rota para criação de cartelas',
   })
   @Post()
   create(@LoggedUser() user: User) {
     return this.cardService.create(user);
   }

   @ApiOperation({
    summary: 'Rota para deletar uma cartela',
  })
  @Delete()
  delete(@LoggedUser() user: User) {
    return this.cardService.remove(user.id);
  }
}


