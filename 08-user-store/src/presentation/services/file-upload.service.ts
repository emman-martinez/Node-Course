import fs from 'fs';
import path from 'path';
import type { UploadedFile } from 'express-fileupload';
import { Uuid } from '../../config';
import { CustomError } from '../../domain';

export class FileUploadService {
  // DI: Dependency Injection
  constructor(private readonly uuid = Uuid.v4) {}

  private checkFolder(folderPath: string) {
    if (!fs.existsSync(folderPath))
      fs.mkdirSync(folderPath, { recursive: true });
  }

  async uploadSingle(
    file: UploadedFile,
    folder: string = 'uploads',
    validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
  ) {
    const fileExtension = file.mimetype.split('/').at(1);

    if (!fileExtension || !validExtensions.includes(fileExtension)) {
      throw CustomError.badRequest(
        `Invalid file type ${fileExtension}. Allowed types: ${validExtensions.join(', ')}`
      );
    }

    const destination = path.resolve(__dirname, '../../../', folder);
    this.checkFolder(destination);

    const fileName = `${this.uuid()}.${fileExtension}`;

    file.mv(`${destination}/${fileName}`);

    return { fileName };
  }

  async uploadMultiple(
    files: UploadedFile[],
    folder: string = 'uploads',
    validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
  ) {
    const fileNames = await Promise.all(
      files.map((file) => this.uploadSingle(file, folder, validExtensions))
    );

    return fileNames;
  }
}
