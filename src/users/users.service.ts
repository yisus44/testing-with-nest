import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  async createUser(username: string, password: string): Promise<User> {
    return {
      id: 1,
      password,
      username,
    };
  }
}
