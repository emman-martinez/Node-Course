import type { Request, Response } from 'express';
import { CustomError } from '../../domain';

export class FileUploadController {
  // DI
  constructor() {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error(`${error}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  };

  uploadFile = async (req: Request, res: Response) => {
    res.json('File uploaded successfully');
  };

  uploadMultipleFiles = async (req: Request, res: Response) => {
    res.json('Multiple files uploaded successfully');
  };
}
