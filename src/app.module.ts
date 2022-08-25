import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './User/users.module';
import { RoomModule } from './Room/room.module';
import { CardModule } from './card/card.module';
// import { AppGateway } from './app.gateway';

@Module({
  imports: [UsersModule, AuthModule, PrismaModule, RoomModule, CardModule],
  controllers: [AppController],
  providers: [AppService], //, AppGateway],
})
export class AppModule {}

