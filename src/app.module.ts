import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './User/users.module';
import { RoomModule } from './Room/room.module';

@Module({
  imports: [UsersModule, AuthModule, PrismaModule, RoomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
