import { UserRole } from '../entities/user.entity';

export interface JwtPayload {
    id: number;
    username: string;
    role: UserRole;
}
  