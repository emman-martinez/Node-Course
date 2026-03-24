export class TodoEntity {
  constructor(
    public id: number,
    public title: string,
    public completedAt?: Date | null,
  ) {}

  get isCompleted(): boolean {
    return !!this.completedAt;
  }
}
