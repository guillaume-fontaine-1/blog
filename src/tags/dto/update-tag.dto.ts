import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTagDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @ApiProperty({ description: 'The name of the tag' })
  name: string;
}
