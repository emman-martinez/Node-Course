import request from "supertest";
import { testServer } from "../../test-server";
import prismaClient from "../../../src/data/postgres";

describe("Todo route testing", () => {
  beforeAll(async () => {
    await testServer.start();
  });

  afterAll(() => {
    testServer.close();
  });

  beforeEach(async () => {
    await prismaClient.todo.deleteMany();
  });

  const todo1 = {
    title: "Buy groceries",
  };
  const todo2 = {
    title: "Walk the dog",
  };

  test("should return TODOs api/todos", async () => {
    await prismaClient.todo.createMany({
      data: [todo1, todo2],
    });

    const { body } = await request(testServer.app)
      .get("/api/todos")
      .expect(200);

    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBe(2);
    expect(body[0].title).toBe(todo1.title);
    expect(body[1].title).toBe(todo2.title);
    expect(body[0].completedAt).toBeNull();
  });

  test("should return a single TODO by id api/todos/:id", async () => {
    const createdTodo = await prismaClient.todo.create({
      data: todo1,
    });

    const { body } = await request(testServer.app)
      .get(`/api/todos/${createdTodo.id}`)
      .expect(200);

    expect(body).toHaveProperty("id", createdTodo.id);
    expect(body).toHaveProperty("title", createdTodo.title);
    expect(body).toHaveProperty("completedAt", null);
    expect(body).toEqual(
      expect.objectContaining({
        id: createdTodo.id,
        title: createdTodo.title,
        completedAt: createdTodo.completedAt,
      }),
    );
  });
});
