import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BlogPost } from './blog-post.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The ID of the tag' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The name of the tag' })
  name: string;

  @OneToMany(() => BlogPost, (blogPost) => blogPost.tag)
  blogPosts: BlogPost[];
}
