import { Controller, Get, UseGuards } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('blog-posts')
  @ApiOperation({ summary: 'Get blog post views data' })
  @ApiResponse({ status: 200, description: 'Return blog post views data.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DATA_ANALYST)
  @ApiBearerAuth()
  async getBlogPostViewsData(): Promise<any> {
    return this.statisticsService.getBlogPostViewsData();
  }

  @Get('comments')
  @ApiOperation({ summary: 'Get comment data per user per tag' })
  @ApiResponse({ status: 200, description: 'Return comment data per user per tag.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DATA_ANALYST)
  @ApiBearerAuth()
  async getCommentDataPerUserPerTag(): Promise<any> {
    return this.statisticsService.getCommentDataPerUserPerTag();
  }

  @Get('likes')
  @ApiOperation({ summary: 'Get like data per user per tag' })
  @ApiResponse({ status: 200, description: 'Return like data per user per tag.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DATA_ANALYST)
  @ApiBearerAuth()
  async getLikeDataPerUserPerTag(): Promise<any> {
    return this.statisticsService.getLikeDataPerUserPerTag();
  }
}
