import prismaClient from "../../data/postgres";
import {
  CreateTodoDto,
  TodoDatasource,
  TodoEntity,
  UpdateTodoDto,
} from "../../domain";

export class TodoDatasourceImpl implements TodoDatasource {
  create(createTodoDTO: CreateTodoDto): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }

  async getAll(): Promise<TodoEntity[]> {
    const todos = await prismaClient.todo.findMany();
    return todos.map((todo) => TodoEntity.fromObject(todo));
  }

  findById(id: number): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }

  updateById(updateTodoDTO: UpdateTodoDto): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }

  deleteById(id: number): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }
}
