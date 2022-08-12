import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './User/users.module';

@Module({
  imports: [UsersModule,AuthModule,PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
