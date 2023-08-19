import { Injectable } from '@nestjs/common';
import { User } from '../users/entity/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async registerUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.createUser(username, password);
    return user;
  }
}
