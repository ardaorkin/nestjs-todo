import { NextFunction, Request, Response } from 'express';
import { User } from './users/schemas/user.schema';
import { Model } from 'mongoose';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CheckUsernameAndEmailUsed implements NestMiddleware {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { username, email } = req.body;
    const user = await this.userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (user) {
      const isUsernameInUse = user.username === username;
      throw new HttpException(
        `${isUsernameInUse ? 'Username' : 'Email'} is already in use`,
        HttpStatus.FORBIDDEN,
      );
    }
    next();
  }
}
