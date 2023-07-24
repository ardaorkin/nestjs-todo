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

  @Put(':id')
  update(@Param('id') id: string): string {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
