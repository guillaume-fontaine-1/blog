import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogPostDto {
  @IsString()
  @ApiProperty({ description: 'The title of the blog post' })
  title: string;

  @IsString()
  @ApiProperty({ description: 'The content of the blog post' })
  content: string;

  @IsNumber()
  @ApiProperty({ description: 'The ID of the tag of the blog post' })
  tagId: number;

  @IsArray()
  @IsOptional()
  @ApiProperty({ description: 'The IDs of the related blog posts', required: false })
  relatedPostIds?: number[];
}
