import {
  Body, Controller, Delete, Get, Param, Patch, Post
} from '@nestjs/common';
import { User } from '@prisma/client';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomService } from './room.service';


@Controller('Room')
export class RoomController {
  constructor(private readonly RoomService: RoomService) {}

  @Post('/Start')
  create(@Body() dto: CreateRoomDto) {
    return this.RoomService.create(dto);
  }

  @Get()
  findAll() {
    return this.RoomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.RoomService.findOne(id);
  }

  @Get('/room/:id/resetRoom')
  resetRoom(@Param('id') id: string,@LoggedUser() user:User) {
    return this.RoomService.resetRoom(id,user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.RoomService.update(+id, updateRoomDto);
  }


  @Delete('/room/:id/withdrawRoom')
  delete(@Param('id') id: string) {
    return this.RoomService.delete(id);

  }
}
