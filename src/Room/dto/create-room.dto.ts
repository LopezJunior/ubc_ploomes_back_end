import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsNumber()
  @ApiProperty({
    description:'Número máximo de cartelas',
    example:5,
  })
  maxCards: number;

  @IsNumber()
  @ApiProperty({
    description:'Limite de sorteios',
    example:5,
  })
  limitPrizeDraw: number;

  @IsNumber()
  @ApiProperty({
    description:'Limite de registro de bolas',
    example:5,
  })
  limitRecord?: number;

  @IsNumber()
  @ApiProperty({
    description:'Limite de jogadores na sala',
    example:3
  })
  limitUsers: number;

  @IsNumber()
  @ApiProperty({
    description:'Preço a ser pago por cartela',
    example:10,
  })
  price: number;

  @IsNumber()
  @ApiProperty({
    description:"Tempo de sorteio entre uma bola e outra",
    example:10,
  })
  frequency: number;
}
