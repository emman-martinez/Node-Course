import { bcryptAdapter, envs, JwtAdapter } from '../../config';
import { UserModel } from '../../data';
import {
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from '../../domain';
import { EmailService } from './email.service';

export class AuthService {
  constructor(
    private readonly emailService: EmailService,
  ) {}

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

      // Send email to validate the email
      await this.sendEmailValidationLink(user.email);

      const userEntity = this.sanitizeUser(UserEntity.fromObject(user));
      const payload = { id: user.id };

       // JWT <---- to maintain the user authentication
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

  private sendEmailValidationLink = async(email: string) => {
    const token = await JwtAdapter.generateToken({ email }); // Token expires in 1 hour
    if (!token) throw CustomError.internalServer('Error generating token');

    const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
    const html = `
      <h1>Validate your email</h1>
      <p>Please click the link below to validate your email:</p>
      <a href="${link}">Validate Email: ${email}</a>
    `;
    const options = {
      to: email,
      subject: 'Validate your email',
      htmlBody: html,
    }

    const isSent = await this.emailService.sendEmail(options);
    if(!isSent) throw CustomError.internalServer('Error sending email');

    return true;
  }
}
