import {
  Body,
  Controller,
  Delete,
  Get,
  Param, Post,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/User/entities/user.entity';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomService } from './room.service';

@ApiTags('Room')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('Room')
export class RoomController {
  constructor(private readonly RoomService: RoomService) {}

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post('/Start')
  create(@LoggedUser() user:User,@Body() dto: CreateRoomDto) {
    return this.RoomService.create(user,dto);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/room/:id/resetRoom')
  resetRoom(@Param('id') id: string, @LoggedUser() user: User) {
    return this.RoomService.resetRoom(id, user.id);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete('/room/:id/withdrawRoom')
  delete(@Param('id') id: string) {
    return this.RoomService.delete(id);
  }
}
