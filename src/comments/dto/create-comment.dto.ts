import { IsString, Length, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @IsString()
  @Length(1, 50)
  @ApiProperty({ description: 'The content of the comment' })
  content: string;

  @IsNumber()
  @ApiProperty({ description: 'The ID of the blog post the comment belongs to' })
  blogPostId: number;
}
