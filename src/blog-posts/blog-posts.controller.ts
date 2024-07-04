import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BlogPostsService } from './blog-posts.service';
import { BlogPost } from '../entities/blog-post.entity';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole, User } from '../entities/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('blog-posts')
@Controller('blog-posts')
export class BlogPostsController {
  constructor(private readonly blogPostsService: BlogPostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new blog post' })
  @ApiResponse({ status: 201, description: 'The blog post has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  async create(@Body() createBlogPostDto: CreateBlogPostDto, @GetUser() user: User): Promise<BlogPost> {
    return this.blogPostsService.create(createBlogPostDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all blog posts' })
  @ApiResponse({ status: 200, description: 'Return all blog posts.' })
  async findAll(): Promise<BlogPost[]> {
    return this.blogPostsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a blog post by ID' })
  @ApiResponse({ status: 200, description: 'Return the blog post with the specified ID.' })
  @ApiResponse({ status: 404, description: 'Blog post not found.' })
  async findOne(@Param('id') id: number): Promise<BlogPost> {
    return this.blogPostsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a blog post by ID' })
  @ApiResponse({ status: 200, description: 'The blog post has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Blog post not found.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  async update(@Param('id') id: number, @Body() updateBlogPostDto: UpdateBlogPostDto): Promise<BlogPost> {
    return this.blogPostsService.update(id, updateBlogPostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a blog post by ID' })
  @ApiResponse({ status: 200, description: 'The blog post has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Blog post not found.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  async remove(@Param('id') id: number): Promise<void> {
    return this.blogPostsService.remove(id);
  }
}
