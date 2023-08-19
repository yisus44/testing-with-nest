import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  describe('generateGreeting', () => {
    it('should generate a personalized greeting', () => {
      // Arrange
      const name = 'Alice';
      const expectedGreeting = 'Hello, Alice!';

      // Act
      const result = appService.generateGreeting(name);

      // Assert
      expect(result).toBe(expectedGreeting);
    });
  });
});
