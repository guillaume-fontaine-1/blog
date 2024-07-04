import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { BlogPost } from '../entities/blog-post.entity';
import { Comment } from '../entities/comment.entity';
import { Like } from '../entities/like.entity';
import { User } from '../entities/user.entity';
import { Tag } from '../entities/tag.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogPost, Comment, Like, User, Tag]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    AuthModule
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService, JwtStrategy],
  exports: [StatisticsService],
})
export class StatisticsModule {}
