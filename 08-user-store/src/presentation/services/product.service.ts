import { ProductModel } from '../../data';
import {
  CreateProductDto,
  CustomError,
  PaginationDto,
  UserEntity,
} from '../../domain';

export class ProductService {
  // DI
  constructor() {}

  async createProduct(createProductDto: CreateProductDto, user: UserEntity) {
    const productExist = await ProductModel.findOne({
      name: createProductDto.name,
    });

    if (productExist) throw CustomError.badRequest('Product already exists');

    try {
      const product = new ProductModel({
        ...createProductDto,
        user: user.id,
      });

      await product.save();

      return {
        id: product.id,
        name: product.name,
        available: product.available,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getProducts(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit),
      ]);

      return {
        page,
        limit,
        total,
        next: `/api/products?page=${page + 1}&limit=${limit}`,
        previous:
          page - 1 > 0 ? `/api/products?page=${page - 1}&limit=${limit}` : null,
        products: products.map((product) => ({
          id: product.id,
          name: product.name,
          available: product.available,
        })),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
