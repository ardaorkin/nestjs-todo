import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://ardaorkin:7hgEWu8XFlhBRQco@cluster.sk8oshf.mongodb.net/?retryWrites=true&w=majority',
    ),
    UsersModule,
    TodosModule,
  ],
})
export class AppModule {}
