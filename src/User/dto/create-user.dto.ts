import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description:"Nome do usuárip",
    example: 'Equipe 4'
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description:"Email do usuário",
    example: 'equipe4@gmail.com'
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description:"Senha do usuário",
    example: 'equipe4@123'
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'equipe4@123'
  })
  confirmPassword: string;
}
