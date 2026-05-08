import request from "supertest";
import { testServer } from "../../test-server";
import prismaClient from "../../../src/data/postgres";

describe("Todo route testing", () => {
  beforeAll(async () => {
    await testServer.start();
  });

  afterAll(async () => {
    testServer.close();
    await prismaClient.$disconnect();
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

  test("should return a 404 TODO NotFound api/todos/:id", async () => {
    const todoId = 999;
    const { body } = await request(testServer.app)
      .get(`/api/todos/${todoId}`)
      .expect(400);

    expect(body).toEqual({ error: `Todo with id: ${todoId} not found` });
  });

  test("should return a new TODO api/todos", async () => {
    const { body } = await request(testServer.app)
      .post("/api/todos")
      .send(todo1)
      .expect(201);

    expect(body).toEqual({
      id: expect.any(Number),
      title: todo1.title,
      completedAt: null,
    });
  });

  test("should return an error if text is not present api/todos", async () => {
    const { body } = await request(testServer.app)
      .post("/api/todos")
      .send({})
      .expect(400);

    expect(body).toEqual({ error: "Title property is required." });
  });

  test("should return an error if text is empty api/todos", async () => {
    const { body } = await request(testServer.app)
      .post("/api/todos")
      .send({ title: "" })
      .expect(400);

    expect(body).toEqual({ error: "Title property is required." });
  });

  test("should return an update TODO api/todos/:id", async () => {
    const todo = await prismaClient.todo.create({
      data: todo1,
    });

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todo.id}`)
      .send({
        title: "Hello World UPDATE",
        completedAt: "2023-10-21",
      })
      .expect(200);

    expect(body).toEqual({
      id: todo.id,
      title: "Hello World UPDATE",
      completedAt: "2023-10-21T00:00:00.000Z",
    });
  });

  test("should return a 404 if TODO not found api/todos/:id", async () => {
    const todoId = 999;
    const { body } = await request(testServer.app)
      .put(`/api/todos/${todoId}`)
      .send({
        title: "Hello World UPDATE",
        completedAt: "2023-10-21",
      })
      .expect(400);

    expect(body).toEqual({ error: `Todo with id: ${todoId} not found` });
  });

  // TODO: MAKE THE OPERATION WITH CUSTOM ERRORS
  test("should return an updated TODO only the date should be updated", async () => {
    const todo = await prismaClient.todo.create({
      data: todo1,
    });

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todo.id}`)
      .send({
        completedAt: "2023-10-21",
      })
      .expect(200);

    expect(body).toEqual({
      id: todo.id,
      title: todo1.title,
      completedAt: "2023-10-21T00:00:00.000Z",
    });
  });

  test("should delete a TODO api/todos/:id", async () => {
    const todo = await prismaClient.todo.create({
      data: todo1,
    });

    const { body } = await request(testServer.app)
      .delete(`/api/todos/${todo.id}`)
      .expect(200);

    expect(body).toEqual({
      id: todo.id,
      title: todo.title,
      completedAt: null,
    });
  });

  test("should return 404 if TODO does not exist api/todos/:id", async () => {
    const todoId = 999;
    const { body } = await request(testServer.app)
      .delete(`/api/todos/${todoId}`)
      .expect(400);

    expect(body).toEqual({ error: `Todo with id: ${todoId} not found` });
  });
});
