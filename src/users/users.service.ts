import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  async createUser(username: string, password: string): Promise<User> {
    // if (username) throw new BadRequestException('Username must not be empty');
    return {
      id: 1,
      password,
      username,
    };
  }
}
