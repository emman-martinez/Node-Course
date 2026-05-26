export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, available = false } = object;
    let availableValue = available;

    if (!name) return ['Missing name'];
    if (typeof available !== 'boolean') {
      availableValue = available === 'true';
    }

    return [undefined, new CreateProductDto(name, availableValue)];
  }
}
