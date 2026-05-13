import { regularExps } from "../../../config";

interface ObjWithAnyProperties {
  [key: string]: any;
}

export class RegisterUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}

  static create(obj: ObjWithAnyProperties): [string?, RegisterUserDto?] {
    const { name, email, password } = obj;

    if (!name) return ["Missing name", undefined];
    if (!email) return ["Missing email", undefined];
    if (!regularExps.email.test(email)) return ["Invalid email format", undefined];
    if (!password) return ["Missing password", undefined];
    if (password.length < 6) return ["Password must be at least 6 characters long", undefined];

    return [undefined, new RegisterUserDto(name, email, password)];
  }
}
