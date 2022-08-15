import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
  create(createRoomDto: CreateRoomDto) {
    return 'This action adds a new folderName';
  }

  findAll() {
    return `This action returns all folderName`;
  }

  findOne(id: number) {
    return `This action returns a #${id} folderName`;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} folderName`;
  }

  remove(id: number) {
    return `This action removes a #${id} folderName`;
  }
}
