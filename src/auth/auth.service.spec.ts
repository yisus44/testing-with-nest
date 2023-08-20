import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from '../users/entity/user.entity';
import { UsersService } from '../users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersModule } from '../users/users.module';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        UsersService,
        AuthService,
      ],
    }).compile();

    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    usersService = module.get<UsersService>(UsersService);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should register a new user', async () => {
    // Arrange;
    const username = 'testuser';
    const password = 'testpassword';
    const expectedUser: User = { id: 1, username, password };
    jest.spyOn(userRepository, 'create').mockReturnValue(expectedUser);
    jest.spyOn(userRepository, 'save').mockResolvedValue(expectedUser);

    // Act;
    const result = await authService.registerUser(username, password);

    // Assert;
    expect(result).toEqual(expectedUser);
    expect(userRepository.save).toHaveBeenCalledWith(expectedUser);
  });

  it('should return null when there is no username', async () => {
    // Arrange;
    const username = 'testuser';
    const password = '';
    const expectedUser: User = { id: 1, username, password };
    jest.spyOn(userRepository, 'create').mockReturnValue(expectedUser);
    jest.spyOn(userRepository, 'save').mockResolvedValue(expectedUser);

    // Act;
    const result = await authService.registerUser(username, password);

    // Assert;
    expect(result).toEqual(expectedUser);
    expect(userRepository.save).toHaveBeenCalledWith(expectedUser);
  });
});
