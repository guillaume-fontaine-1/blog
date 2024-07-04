import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLikeDto } from './dto/create-like.dto';
import { User } from '../entities/user.entity';
import { BlogPost } from '../entities/blog-post.entity';
import { Like } from '../entities/like.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
    @InjectRepository(BlogPost)
    private blogPostsRepository: Repository<BlogPost>,
  ) {}

  async create(createLikeDto: CreateLikeDto, user: User): Promise<Like> {
    const { blogPostId } = createLikeDto;
    const blogPost = await this.blogPostsRepository.findOne({ where: { id: blogPostId } });

    if (!blogPost) {
      throw new NotFoundException(`Blog post with ID ${blogPostId} not found`);
    }

    const like = this.likesRepository.create({
      user,
      blogPost,
    });

    return this.likesRepository.save(like);
  }

  async remove(id: number, user: User): Promise<void> {
    const like = await this.likesRepository.findOne({ where: { id, user: { id: user.id } } });

    if (!like) {
      throw new NotFoundException(`Like with ID ${id} not found`);
    }

    if (like.user.id !== user.id) {
      throw new ForbiddenException('You are not allowed to delete this like');
    }

    await this.likesRepository.delete(id);
  }
}
