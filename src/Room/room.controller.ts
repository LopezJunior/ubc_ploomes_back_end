import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomService } from './room.service';

@ApiTags('Room')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('Room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post('/room')
  create(@LoggedUser() user: User, @Body() dto: CreateRoomDto) {
    return this.roomService.create(user, dto);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/room/:id')
  FindById(@Param('id') id: string) {
    return this.roomService.findById(id);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/room/resetRoom')
  resetRoom(@LoggedUser() user: User) {
    return this.roomService.resetRoom(user);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Rota que valida se o jogador conseguiu bingar',
  })
  @Get('/room/:id/checkBingo')
  CheckBingo(@Param('id') id: string) {
    return this.roomService.checkBingo;
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete('/room/:id/withdrawRoom')
  delete(@Param('id') id: string) {
    return this.roomService.delete(id);
  }
}
