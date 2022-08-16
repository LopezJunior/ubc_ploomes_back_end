import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsNumber()
  @ApiProperty({
    example: 'Número da sala',
  })
  number: number;

  @IsNumber()
  @ApiProperty({
    example: 'Número máximo de cartelas',
  })
  maxCards: number;

  @IsNumber()
  @ApiProperty({
    example: 'Limite de sorteios',
  })
  limitPrizeDraw: number;

  @IsNumber()
  @ApiProperty({
    example: 'Limite de registros',
  })
  limitRecord?: number;

  @IsNumber()
  @ApiProperty({
    example: 'Limite de jogadores na sala',
  })
  limitUsers: number;

  @IsNumber()
  @ApiProperty({
    example: 'Preço a ser pago para jogar a partida',
  })
  price: number;

  @IsNumber()
  @ApiProperty({
    example: 'Número de luvas que serão exibidas no histórico de sorteio',
  })
  historic: number;

  @IsNumber()
  @ApiProperty({
    example: '',
  })
  frequency: number;
}
