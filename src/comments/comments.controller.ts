import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole, User } from '../entities/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiResponse({ status: 201, description: 'The comment has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  async create(@Body() createCommentDto: CreateCommentDto, @GetUser() user: User): Promise<Comment> {
    return this.commentsService.create(createCommentDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments' })
  @ApiResponse({ status: 200, description: 'Return all comments.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MODERATOR)
  @ApiBearerAuth()
  async findAll(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a comment by ID' })
  @ApiResponse({ status: 200, description: 'Return the comment with the specified ID.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: number, @GetUser() user: User): Promise<Comment> {
    return this.commentsService.findOne(id, user);
  }

  @Put(':id/approve')
  @ApiOperation({ summary: 'Approve a comment by ID' })
  @ApiResponse({ status: 200, description: 'The comment has been successfully approved.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MODERATOR)
  @ApiBearerAuth()
  async approve(@Param('id') id: number): Promise<Comment> {
    return this.commentsService.approve(id);
  }

  @Put(':id/flag')
  @ApiOperation({ summary: 'Flag a comment by ID' })
  @ApiResponse({ status: 200, description: 'The comment has been successfully flagged.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async flag(@Param('id') id: number, @GetUser() user: User): Promise<Comment> {
    return this.commentsService.flag(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment by ID' })
  @ApiResponse({ status: 200, description: 'The comment has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: number, @GetUser() user: User): Promise<void> {
    return this.commentsService.remove(id, user);
  }
}
