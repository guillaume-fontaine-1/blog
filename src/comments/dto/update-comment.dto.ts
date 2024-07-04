import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @IsString()
  @Length(1, 50)
  @ApiProperty({ description: 'The content of the comment' })
  content: string;
}
