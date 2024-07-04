import { IsString, MinLength, MaxLength, Matches, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ description: 'The username of the user', required: false })
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password too weak' })
  @ApiProperty({ description: 'The password of the user', required: false })
  password?: string;

  @IsOptional()
  @IsEnum(UserRole)
  @ApiProperty({ description: 'The role of the user', enum: UserRole, required: false })
  role?: UserRole;
}
