import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeDto {
  @IsNumber()
  @ApiProperty({ description: 'The ID of the blog post that was liked' })
  blogPostId: number;
}
