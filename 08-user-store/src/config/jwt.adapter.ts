import jwt from 'jsonwebtoken';

export class JwtAdapter {
  static async generateToken(
    payload: string | object | Buffer,
    duration: jwt.SignOptions['expiresIn'] = '2h'
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(payload, 'SEED', { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null);
        resolve(token!);
      });
    });
  }

  //   static validateToken(token: string) {
  //     return;
  //   }
}
