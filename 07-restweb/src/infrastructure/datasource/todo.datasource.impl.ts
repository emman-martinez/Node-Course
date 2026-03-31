import prismaClient from "../../data/postgres";
import {
  CreateTodoDto,
  TodoDatasource,
  TodoEntity,
  UpdateTodoDto,
} from "../../domain";

export class TodoDatasourceImpl implements TodoDatasource {
  async create(createTodoDTO: CreateTodoDto): Promise<TodoEntity> {
    const newTodo = await prismaClient.todo.create({
      data: createTodoDTO!,
    });

    return TodoEntity.fromObject(newTodo);
  }

  async getAll(): Promise<TodoEntity[]> {
    const todos = await prismaClient.todo.findMany();
    return todos.map((todo) => TodoEntity.fromObject(todo));
  }

  async findById(id: number): Promise<TodoEntity> {
    const todo = await prismaClient.todo.findFirst({
      where: { id },
    });

    if (!todo) throw `Todo with id: ${id} not found`;

    return TodoEntity.fromObject(todo);
  }

  async updateById(updateTodoDTO: UpdateTodoDto): Promise<TodoEntity> {
    await this.findById(updateTodoDTO.id);

    const updatedTodo = await prismaClient.todo.update({
      where: { id: updateTodoDTO.id },
      data: updateTodoDTO!.values,
    });

    return TodoEntity.fromObject(updatedTodo);
  }

  async deleteById(id: number): Promise<TodoEntity> {
    await this.findById(id);
    const deletedTodo = await prismaClient.todo.delete({
      where: { id },
    });

    return TodoEntity.fromObject(deletedTodo);
  }
}
