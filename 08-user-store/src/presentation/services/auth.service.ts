import { bcryptAdapter, JwtAdapter } from '../../config';
import { UserModel } from '../../data';
import {
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from '../../domain';

export class AuthService {
  constructor() {}

  private sanitizeUser(user: UserEntity) {
    const safeUser = { ...user };
    delete (safeUser as Partial<UserEntity>).password;
    return safeUser;
  }

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) throw CustomError.badRequest('Email already exists');

    try {
      const user = new UserModel(registerUserDto);

      // Encrypt password
      user.password = bcryptAdapter.hash(registerUserDto.password);
      await user.save();

      // JWT <---- to maintain the user authentication

      // Send email to validate the email

      const userEntity = this.sanitizeUser(UserEntity.fromObject(user));
      const payload = { id: user.id };
      const token = await JwtAdapter.generateToken(payload);

      if (!token) throw CustomError.internalServer('Error generating token');

      return {
        user: userEntity,
        token,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const existUser = await UserModel.findOne({ email: loginUserDto.email });

    if (!existUser) throw CustomError.badRequest('Email does not exist');

    const isPasswordValid = bcryptAdapter.compare(
      loginUserDto.password,
      existUser.password
    );

    if (!isPasswordValid) throw CustomError.badRequest('Invalid password');

    const userEntity = this.sanitizeUser(UserEntity.fromObject(existUser));
    const payload = { id: existUser.id };
    const token = await JwtAdapter.generateToken(payload);

    if (!token) throw CustomError.internalServer('Error generating token');

    return {
      user: userEntity,
      token,
    };
  }
}
