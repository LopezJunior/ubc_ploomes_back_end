import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCardDto {
    @IsNumber()
    @ApiProperty({
        description: 'Recebe um vetor numérico, correspondente a cartela do bingo',
    })
    vetor: number[];
    
    
    @IsString()
    @ApiProperty({
        description: 'Id do proprietário da cartela',
    })
     userID: string;
}
