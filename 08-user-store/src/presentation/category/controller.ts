import type { Request, Response } from 'express';
import { CreateCategoryDto, CustomError } from '../../domain';

export class CategoryController {
  // DI
  constructor() {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error(`${error}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  };

  createCategory = async (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
    if (error) return res.status(400).json({ error });

    try {
      // Lógica para crear una categoría
      res
        .status(201)
        .json({ message: 'Category created', data: createCategoryDto });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getCategories = async (req: Request, res: Response) => {
    try {
      // Lógica para obtener las categorías
      res.status(200).json({ message: 'Retrieved categories' });
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
