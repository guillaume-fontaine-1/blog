import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { Like } from './like.entity';
import { Tag } from './tag.entity';

@Entity()
export class BlogPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.blogPosts)
  author: User;

  @Column()
  date: Date;

  @ManyToOne(() => Tag, (tag) => tag.blogPosts)
  tag: Tag;

  @ManyToMany(() => BlogPost)
  @JoinTable()
  relatedPosts: BlogPost[];

  @OneToMany(() => Comment, (comment) => comment.blogPost)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.blogPost)
  likes: Like[];

  @Column({ default: 0 })
  views: number;
}
