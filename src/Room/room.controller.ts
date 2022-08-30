import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { checkBingoDto } from './dto/checkBingo.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomService } from './room.service';

@ApiTags('Room')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('room')

export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Rota responsável por criar uma sala para a partida',
  })
  @Post()
  create(@LoggedUser() user: User, @Body() dto: CreateRoomDto) {
    return this.roomService.create(user, dto);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Rota que localiza a sala de jogo pelo Id',
  })
  @Get('/:id')
  FindById(@Param('id') id: string) {
    return this.roomService.findById(id);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Rota responsável por resetar a partida',
  })
  @Get('/resetRoom')
  resetRoom(@LoggedUser() user: User) {
    return this.roomService.resetRoom(user);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Rota que valida se o jogador conseguiu bingar',
  })
  @Patch('/:id/checkBingo')
  CheckBingo(@LoggedUser() user: User, @Body() dto: checkBingoDto) {
    return this.roomService.checkBingo(user, dto);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Rota que exclui a sala após o término da partida',
  })
  @Delete('/:id/withdrawRoom')
  delete(@Param('id') id: string) {
    return this.roomService.delete(id);
  }
}
