import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from '../users/entity/user.entity';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('registerUser', () => {
    it('should register a new user', async () => {
      // Arrange
      const username = 'testuser';
      const password = 'testpassword';
      const expectedUser: User = { id: 1, username, password };
      (usersService.createUser as jest.Mock).mockResolvedValue(expectedUser);

      // Act
      const result = await authService.registerUser(username, password);

      // Assert
      expect(result).toEqual(expectedUser);
      expect(usersService.createUser).toHaveBeenCalledWith(username, password);
    });
  });
});
