import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from './tags/tags.module';
import { LikesModule } from './likes/likes.module';
import { BlogPostsModule } from './blog-posts/blog-posts.module';
import { CommentsModule } from './comments/comments.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'blog',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }), AuthModule, UsersModule, TagsModule, LikesModule, BlogPostsModule, CommentsModule, StatisticsModule],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule { }
