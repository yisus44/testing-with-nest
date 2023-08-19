import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  generateGreeting(name: string): string {
    return `Hello, ${name}!`;
  }
  getHello(): string {
    return 'Hello World!';
  }
}
