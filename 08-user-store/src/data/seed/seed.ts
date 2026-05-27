import { envs } from '../../config';
import {
  CategoryModel,
  MongoDatabase,
  ProductModel,
  UserModel,
} from '../mongo';
import { seedData } from './data';

(async () => {
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  await main();

  await MongoDatabase.disconnect();
})();

const randomBetween0AndX = (x: number) => Math.floor(Math.random() * x);

async function main() {
  // 0. Clear all
  await Promise.all([
    UserModel.deleteMany(),
    CategoryModel.deleteMany(),
    ProductModel.deleteMany(),
  ]);

  // 1. Create users
  const users = await UserModel.insertMany(seedData.users);

  // 2. Create categories
  const categories = await CategoryModel.insertMany(
    seedData.categories.map((category) => {
      return {
        ...category,
        user: users[0]._id, // assign all categories to the first user
      };
    })
  );

  // 3. Create products
  const products = await ProductModel.insertMany(
    seedData.products.map((product) => {
      return {
        ...product,
        user: users[randomBetween0AndX(seedData.users.length - 1)]._id, // assign a random user to each product
        category:
          categories[randomBetween0AndX(seedData.categories.length - 1)]._id, // assign a random category to each product
      };
    })
  );
}
