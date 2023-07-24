import { Date } from 'src/types';

export class CreateTodoDto {
  title: string;
  description?: string;
  deadLine?: Date;
}
