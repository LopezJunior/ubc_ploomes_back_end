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
import { Prisma,User} from '@prisma/client';
import { userInfo } from 'os';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@ApiTags('Cards')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('card')
export class CardController {
  prisma: any;
  constructor(private readonly cardService: CardService) {}

  @Post()
  create(dto:CreateCardDto,@LoggedUser() user:User) {
    return this.cardService.create(dto,user);    
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(+id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param() id:string) {
    return this.cardService.remove(id);
  }
}
