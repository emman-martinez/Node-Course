export class TodoEntity {
  constructor(
    public id: number,
    public title: string,
    public completedAt?: Date | null,
  ) {}

  get isCompleted(): boolean {
    return !!this.completedAt;
  }

  public static fromObject(object: { [key: string]: any }): TodoEntity {
    const requiredFields = ["id", "title"];

    for (const field of requiredFields) {
      if (!(field in object)) throw `Missing required field: ${field}`;
    }

    const { id, title, completedAt } = object;
    let newCompletedAt;

    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (isNaN(newCompletedAt.getTime()))
        throw `Invalid date format for completedAt: ${completedAt}`;
    }

    return new TodoEntity(id, title, completedAt);
  }
}
