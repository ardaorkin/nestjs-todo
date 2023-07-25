import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './create-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Post()
  async addTodo(
    @Body() createTodo: CreateTodoDto,
    @Headers() header,
  ): Promise<CreateTodoDto | object> {
    const { authorization } = header;
    const newTodo = await this.todoService.createTodo(
      authorization,
      createTodo,
    );
    return newTodo;
  }

  @Get()
  async getTodos(@Headers() headers): Promise<CreateTodoDto[] | []> {
    const { authorization } = headers;
    const usersTodo = await this.todoService.getTodos(authorization);
    return usersTodo;
  }

  @Put(':id/complete')
  async completeTodo(
    @Param('id') id: string,
    @Headers() headers,
  ): Promise<CreateTodoDto | object> {
    const { authorization } = headers;
    const updatedTodo = await this.todoService.completeTodo(authorization, id);
    return updatedTodo;
  }

  @Put(':id/incomplete')
  async inCompleteTodo(
    @Param('id') id: string,
    @Headers() headers,
  ): Promise<CreateTodoDto | object> {
    const { authorization } = headers;
    const updatedTodo = await this.todoService.inCompleteTodo(
      authorization,
      id,
    );
    return updatedTodo;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Headers() headers) {
    const { authorization } = headers;
    const result = await this.todoService.removeTodo(authorization, id);
    return result;
  }
}
