import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCardDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Recebe um vetor numérico, correspondente a cartela do bingo',
    example:"5,15,4,7,8,19,27,16,20,18,37,40,43,32,34,49,52,57,50,46,61,65,73,64,71",
  })
  vetor: number[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Id do proprietário da cartela',
    example:"jiododiodjiodjiodjiodjido"
  })
  userID: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Id da sala onde está ocorrendo a partida',
    example:"jiododiodjiodjiodjiodjido"
  })
  roomID: string;
}
