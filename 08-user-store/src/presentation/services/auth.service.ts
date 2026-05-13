import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";

export class AuthService {
  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) throw CustomError.badRequest('Email already exists');

    try {
      const user = new UserModel(registerUserDto);
      await user.save();

      // Encrypt password

      // JWT <---- to maintain the user authentication

      // Send email to validate the email
      const { password, ...userEntity } = UserEntity.fromObject(user);

      return {
        user: userEntity,
        token: 'fake-jwt-token'
      }
    } catch (error) {
        throw CustomError.internalServer(`${error}`);
    }


  }
}
