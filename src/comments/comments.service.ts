import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User, UserRole } from '../entities/user.entity';
import { BlogPost } from '../entities/blog-post.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(BlogPost)
    private blogPostsRepository: Repository<BlogPost>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createCommentDto: CreateCommentDto, user: User): Promise<Comment> {
    const { content, blogPostId } = createCommentDto;
    const blogPost = await this.blogPostsRepository.findOne({where: { id: blogPostId }});

    if (!blogPost) {
      throw new NotFoundException(`Blog post with ID ${blogPostId} not found`);
    }

    const comment = this.commentsRepository.create({
      content,
      author: user,
      blogPost,
      createdAt: new Date(),
    });

    return this.commentsRepository.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    return this.commentsRepository.find({ relations: ['author', 'blogPost'] });
  }

  async findOne(id: number, user: User): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({where: { id }, relations: ['author', 'blogPost']});

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    if (user.role !== UserRole.MODERATOR && comment.author.id !== user.id) {
      throw new ForbiddenException('You are not allowed to view this comment');
    }

    return comment;
  }

  async approve(id: number): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({where: { id }});
    comment.isApproved = true;
    return this.commentsRepository.save(comment);
  }

  async flag(id: number, user: User): Promise<Comment> {
    const comment = await this.findOne(id, user);
    comment.isFlagged = true;
    const updatedComment = await this.commentsRepository.save(comment);

    const userComments = await this.commentsRepository.find({ where: { author: user, isFlagged: true } });
    const redFlags = userComments.length;

    if (redFlags >= 10) {
      user.bannedUntil = new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000);
      await this.usersRepository.save(user);
    } else if (redFlags == 2) {
      user.bannedUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      await this.usersRepository.save(user);
    }

    return updatedComment;
  }

  async remove(id: number, user: User): Promise<void> {
    const comment = await this.findOne(id, user);

    if (user.role !== UserRole.MODERATOR && comment.author.id !== user.id) {
      throw new ForbiddenException('You are not allowed to delete this comment');
    }

    await this.commentsRepository.delete(id);
  }
}
