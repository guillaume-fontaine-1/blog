import { IsString, MinLength, MaxLength, Matches, IsEnum } from 'class-validator';
import { UserRole } from '../../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password too weak' })
  @ApiProperty({ example: 'password123', description: 'The password of the user' })
  password: string;

}
