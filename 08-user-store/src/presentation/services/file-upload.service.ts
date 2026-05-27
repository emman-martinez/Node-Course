import fs from 'fs';
import path from 'path';
import type { UploadedFile } from 'express-fileupload';

export class FileUploadService {
  // DI: Dependency Injection
  constructor() {}

  private checkFolder(folderPath: string) {
    if (!fs.existsSync(folderPath))
      fs.mkdirSync(folderPath, { recursive: true });
  }

  async uploadSingle(
    file: UploadedFile,
    folder: string = 'uploads',
    validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
  ) {
    try {
      const fileExtension = file.mimetype.split('/').at(1);
      const destination = path.resolve(__dirname, '../../../', folder);
      this.checkFolder(destination);

      file.mv(destination + `/my-image.${fileExtension}`);
    } catch (error) {
      console.error(`${error}`);
    }
  }

  uploadMultiple(
    files: UploadedFile[],
    folder: string = 'uploads',
    validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
  ) {}
}
