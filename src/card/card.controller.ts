import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prisma, User } from '@prisma/client';
import { userInfo } from 'os';
import { CreateCard } from 'src/Utils/createCard-utils';
import { handleError } from 'src/Utils/handleError.utils';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@ApiTags('Cards')
@Controller('card')
export class CardController {
  prisma: any;
  constructor(private readonly cardService: CardService) {}

  @Post()
  create(id:string) {
    let card = []
    CreateCard(card)

    const data: Prisma.CardCreateInput = {
      user:{
        connect:{
          id:id
        }
      },
      vetor:card,
    };

    return this.prisma.card.create({
      data,
      select: {
        vetor:true,
        id:{
          id:true
        }
      },
    }).catch(handleError);
  }

  @Get()
  findAll() {
    return this.cardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(+id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardService.remove(+id);
  }
}
