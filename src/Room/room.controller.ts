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
  @Post('/room')
  create(@LoggedUser() user:User,@Body() dto: CreateRoomDto) {
    return this.RoomService.create(user,dto);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/room/:id')
  FindById(@Param('id') id: string) {
    return this.RoomService.findById(id);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/room/resetRoom')
  resetRoom(@LoggedUser() user: User,dto: CreateRoomDto) {
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete('/room/:id/withdrawRoom')
  delete(@Param('id') id: string) {
    return this.RoomService.delete(id);
  }
}
