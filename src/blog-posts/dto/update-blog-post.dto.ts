import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBlogPostDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The title of the blog post', required: false })
  title?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The content of the blog post', required: false })
  content?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'The ID of the tag of the blog post', required: false })
  tagId?: number;

  @IsArray()
  @IsOptional()
  @ApiProperty({ description: 'The IDs of the related blog posts', required: false })
  relatedPostIds?: number[];
}
