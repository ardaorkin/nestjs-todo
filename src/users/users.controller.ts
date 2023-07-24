import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() createUser: CreateUserDto): Promise<object> {
    try {
      await this.usersService.create(createUser);
      return { access_token: 'success' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  @Post('login')
  async login(
    @Body() userCredentials: UserCredentials,
  ): Promise<{ access_token: string }> {
    const foundUser = await this.usersService.findUserByCredentials(
      userCredentials,
    );
    if (foundUser) return { access_token: foundUser.username };

    throw new HttpException('Invalid credentials', HttpStatus.FORBIDDEN);
  }

  @Get('user/:id')
  getUser(@Param('id') id: string): string {
    return `User with ${id} id has been requested.`;
  }
}
