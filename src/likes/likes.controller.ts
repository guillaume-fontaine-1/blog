import { Controller, Post, Body, Delete, Param, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Like } from 'src/entities/like.entity';

@ApiTags('likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new like' })
  @ApiResponse({ status: 201, description: 'The like has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  async create(@Body() createLikeDto: CreateLikeDto, @GetUser() user: User): Promise<Like> {
    return this.likesService.create(createLikeDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a like by ID' })
  @ApiResponse({ status: 200, description: 'The like has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Like not found.' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: number, @GetUser() user: User): Promise<void> {
    return this.likesService.remove(id, user);
  }
}
