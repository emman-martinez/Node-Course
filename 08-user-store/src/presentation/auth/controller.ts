import { Request } from "express";

export class AuthController {
  // DI
  constructor() {}

  registerUser = (req: Request, res: Response) => {
    // Logic for registering a user
    res.json('registerUser');
  }

  loginUser = (req: Request, res: Response) => {
    // Logic for logging in a user
    res.json('loginUser');
  }

  validateEmail = (req: Request, res: Response) => {
    // Logic for validating email
    res.json('validateEmail');
  }
}