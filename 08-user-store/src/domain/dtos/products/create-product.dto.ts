export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string,
    public readonly category: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
    const {
      name,
      available = false,
      price,
      description,
      user,
      category,
    } = object;
    let availableValue = available;

    if (!name) return ['Missing name'];
    if (!user) return ['Missing user'];
    if (!category) return ['Missing category'];
    if (typeof available !== 'boolean') availableValue = available === 'true';

    return [
      undefined,
      new CreateProductDto(
        name,
        availableValue,
        price,
        description,
        user,
        category
      ),
    ];
  }
}
