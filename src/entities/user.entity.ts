import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BlogPost } from './blog-post.entity';
import { Comment } from './comment.entity';
import { Like } from './like.entity';
import { Exclude } from 'class-transformer';

export enum UserRole {
  ADMIN = 'admin',
  DATA_ANALYST = 'dataAnalyst',
  MODERATOR = 'moderator',
  VISITOR = 'visitor',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.VISITOR })
  role: UserRole;

  @Column({ default: 0 })
  redFlags: number;

  @Column({ nullable: true })
  bannedUntil: Date;

  @OneToMany(() => BlogPost, (blogPost) => blogPost.author)
  blogPosts: BlogPost[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];
}
