import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

// abstract class: define a contract for the data source, without providing an implementation.
export abstract class TodoRepository {
  abstract create(createTodoDTO: CreateTodoDto): Promise<TodoEntity>;
  abstract getAll(): Promise<TodoEntity[]>;
  abstract findById(id: number): Promise<TodoEntity>;
  abstract updateById(updateTodoDTO: UpdateTodoDto): Promise<TodoEntity>;
  abstract deleteById(id: number): Promise<TodoEntity>;
}
