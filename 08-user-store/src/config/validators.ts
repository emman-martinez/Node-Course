import mongoose from 'mongoose';

export class Validators {
  static idMongoID(id: string): boolean {
    return mongoose.isValidObjectId(id);
  }
}
