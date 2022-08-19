import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Api-UBC-Bingo')
    .setDescription('Jogo de bingo online com temática do UFC!')
    .setVersion('1.0.0')
    .addTag('status')
    .addTag('Auth')
    .addTag('User')
    .addTag('Room')
    .addTag('Ranking')    
    .addTag('Cards')    
    
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
