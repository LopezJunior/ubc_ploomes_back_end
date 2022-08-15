import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';

@Module({
  imports: [PrismaModule],
  controllers: [RoomController],
  providers: [RoomService]
})
export class RoomModule {}
