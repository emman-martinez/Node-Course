import { regularExps } from "../../../config";

interface ObjWithAnyProperties {
  [key: string]: any;
}

export class LoginUserDto {
  private constructor(
    public email: string,
    public password: string
  ) {}

  static create(obj: ObjWithAnyProperties): [string?, LoginUserDto?] {
    const { email, password } = obj;

    if (!email) return ["Missing email", undefined];
    if (!regularExps.email.test(email)) return ["Invalid email format", undefined];
    if (!password) return ["Missing password", undefined];
    if (password.length < 6) return ["Password must be at least 6 characters long", undefined];

    return [undefined, new LoginUserDto(email, password)];
  }
}
