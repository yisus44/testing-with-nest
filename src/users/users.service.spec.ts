import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    // Arrange
    const username = 'testuser';
    const password = 'testpassword';
    const newUser: User = { id: 1, username, password };
    jest.spyOn(userRepository, 'create').mockReturnValue(newUser);
    jest.spyOn(userRepository, 'save').mockResolvedValue(newUser);

    // Act
    const result = await service.createUser(username, password);

    // Assert
    expect(result).toEqual(newUser);
    expect(userRepository.create).toHaveBeenCalledWith({
      username,
      password,
    });
    expect(userRepository.save).toHaveBeenCalledWith(newUser);
  });

  it('should find a user by id', async () => {
    //Arrange
    const userId = 1;
    const expectedUser: User = {
      id: userId,
      username: 'testuser',
      password: 'testpassword',
    };
    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(expectedUser);

    //Act
    const result = await service.findById(userId);

    //Assert
    expect(expectedUser).toEqual(result);
    expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: userId });
  });

  it('should return undefined if user is not found', async () => {
    // Arrange
    const userId = 1;
    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(undefined);

    // Act
    const result = await service.findById(userId);

    // Assert
    expect(result).toBeUndefined();
    expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: userId });
  });
});
