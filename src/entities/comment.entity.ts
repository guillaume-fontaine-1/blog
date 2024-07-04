import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { BlogPost } from './blog-post.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  content: string;

  @ManyToOne(() => User, (user) => user.comments)
  author: User;

  @ManyToOne(() => BlogPost, (blogPost) => blogPost.comments)
  blogPost: BlogPost;

  @Column()
  createdAt: Date;

  @Column({ default: false })
  isApproved: boolean;

  @Column({ default: false })
  isFlagged: boolean;
}
