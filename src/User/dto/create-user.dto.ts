import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    example: 'Crie um nome de usuário',
  })
  name: string;

  @IsString()
  @ApiProperty({
    example: 'Digite seu email',
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: 'Crie uma senha',
  })
  password: string;

  @IsString()
  @ApiProperty({
    example: 'Digite a senha novamente',
  })
  confirmPassword: string;
}
