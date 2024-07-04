import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost } from '../entities/blog-post.entity';
import { Comment } from '../entities/comment.entity';
import { Like } from '../entities/like.entity';
import { User } from '../entities/user.entity';
import { Tag } from '../entities/tag.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(BlogPost)
    private blogPostsRepository: Repository<BlogPost>,
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  async getBlogPostViewsData(): Promise<any> {
    const blogPosts = await this.blogPostsRepository.find();
    return blogPosts.map((blogPost) => ({
      id: blogPost.id,
      title: blogPost.title,
      views: blogPost.views,
    }));
  }

  async getCommentDataPerUserPerTag(): Promise<any> {
    const users = await this.usersRepository.find({ relations: ['comments', 'comments.blogPost', 'comments.blogPost.tag'] });
    return users.map((user) => ({
      id: user.id,
      username: user.username,
      commentsPerTag: user.comments.reduce((acc, comment) => {
        const tagName = comment.blogPost.tag.name;
        acc[tagName] = (acc[tagName] || 0) + 1;
        return acc;
      }, {}),
    }));
  }

  async getLikeDataPerUserPerTag(): Promise<any> {
    const users = await this.usersRepository.find({ relations: ['likes', 'likes.blogPost', 'likes.blogPost.tag'] });
    return users.map((user) => ({
      id: user.id,
      username: user.username,
      likesPerTag: user.likes.reduce((acc, like) => {
        const tagName = like.blogPost.tag.name;
        acc[tagName] = (acc[tagName] || 0) + 1;
        return acc;
      }, {}),
    }));
  }
}
