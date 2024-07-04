import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { BlogPost } from '../entities/blog-post.entity';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { User } from '../entities/user.entity';
import { Tag } from '../entities/tag.entity';

@Injectable()
export class BlogPostsService {
  constructor(
    @InjectRepository(BlogPost)
    private blogPostsRepository: Repository<BlogPost>,
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  async create(createBlogPostDto: CreateBlogPostDto, user: User): Promise<BlogPost> {
    const { title, content, tagId, relatedPostIds } = createBlogPostDto;
    const tag = await this.tagsRepository.findOne({ where: { id: tagId } });

    if (!tag) {
      throw new NotFoundException(`Tag with ID ${tagId} not found`);
    }

    const relatedPosts = relatedPostIds ? await this.blogPostsRepository.findBy({id: In(relatedPostIds)}) : [];

    const blogPost = this.blogPostsRepository.create({
      title,
      content,
      author: user,
      date: new Date(),
      tag,
      relatedPosts,
    });

    return this.blogPostsRepository.save(blogPost);
  }

  async findAll(): Promise<BlogPost[]> {
    return this.blogPostsRepository.find({ relations: ['author', 'tag', 'relatedPosts'] });
  }

  async findOne(id: number): Promise<BlogPost> {
    const blogPost = await this.blogPostsRepository.findOne({where: { id }, relations: ['author', 'tag', 'relatedPosts']});

    if (!blogPost) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }

    return blogPost;
  }

  async update(id: number, updateBlogPostDto: UpdateBlogPostDto): Promise<BlogPost> {
    const blogPost = await this.findOne(id);
    const { tagId, relatedPostIds, content, title } = updateBlogPostDto;

    if (tagId) {
      const tag = await this.tagsRepository.findOne({ where: { id: tagId } });

      if (!tag) {
        throw new NotFoundException(`Tag with ID ${tagId} not found`);
      }

      blogPost.tag = tag;
    }

    if (relatedPostIds) {
      const relatedPosts = await this.blogPostsRepository.findByIds(relatedPostIds);
      blogPost.relatedPosts = relatedPosts;
    }

    if(content) blogPost.content = content;

    if(title) blogPost.title = title;

    await this.blogPostsRepository.update(id, updateBlogPostDto);

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.blogPostsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }
  }
}
