import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { CreateTodoDto } from './create-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) private todoModel: Model<Todo>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  async getTodos(username: string): Promise<CreateTodoDto[] | []> {
    const userid = await this.userModel.findOne({ username }).select('_id');
    const todos = await this.todoModel.find({ owner: userid });
    return todos;
  }

  async createTodo(
    username: string,
    todo: CreateTodoDto,
  ): Promise<CreateTodoDto | object> {
    const userid = await this.userModel.findOne({ username }).select('_id');
    if (!userid) return {};
    const newTodo = await this.todoModel.create({ ...todo, owner: userid });
    return newTodo;
  }

  async completeTodo(
    username: string,
    id: string,
  ): Promise<CreateTodoDto | object> {
    const owner = await this.userModel.findOne({ username }).select('_id');
    if (!owner) return {};
    const updatedTodo = await this.todoModel.findOneAndUpdate(
      { owner: owner._id, _id: id },
      { completed: true },
      { new: true },
    );
    return updatedTodo;
  }

  async inCompleteTodo(
    username: string,
    id: string,
  ): Promise<CreateTodoDto | object> {
    const owner = await this.userModel.findOne({ username }).select('_id');
    if (!owner) return {};
    const updatedTodo = await this.todoModel.findOneAndUpdate(
      { owner: owner._id, _id: id },
      { completed: false },
      { new: true },
    );
    return updatedTodo;
  }

  async removeTodo(
    username: string,
    id: string,
  ): Promise<{ deletedCount: number }> {
    const owner = await this.userModel.findOne({ username }).select('_id');
    if (!owner) return { deletedCount: 0 };
    const result = await this.todoModel.deleteOne({
      owner: owner._id,
      _id: id,
    });
    return result;
  }
}
