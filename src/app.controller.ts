import {
  Controller,
  Request,
  Post,
  Body,
  UseGuards,
  Get,
  UsePipes,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, createUserSchema } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { User } from './users/entities/user.entity';
import { ZodValidationPipe } from './pipes/ZodValidationPipe';

@Controller()
export class AppController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get()
  hello(): string {
    return 'Hello World!';
  }

  @UseGuards(AuthGuard('local'))
  @ApiTags('Auth')
  @ApiResponse({ status: 201, description: 'Успешная операция' })
  @ApiResponse({ status: 401, description: 'Не удалось авторизоваться' })
  @Post('auth/login')
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }

  @ApiTags('Auth')
  @ApiResponse({ status: 201, description: 'Успешная операция', type: User })
  @ApiResponse({ status: 400, description: 'Ошибка валидации' })
  @Post('auth/register')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  register(@Body() data: CreateUserDto): Promise<User> {
    return this.usersService.register(data);
  }
}
