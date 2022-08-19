import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
