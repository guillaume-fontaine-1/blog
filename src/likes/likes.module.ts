import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { Like } from '../entities/like.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AuthModule } from 'src/auth/auth.module';
import { BlogPost } from 'src/entities/blog-post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like]),
    TypeOrmModule.forFeature([BlogPost]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }), 
    AuthModule
  ],
  controllers: [LikesController],
  providers: [LikesService, JwtStrategy],
  exports: [LikesService],
})
export class LikesModule {}
