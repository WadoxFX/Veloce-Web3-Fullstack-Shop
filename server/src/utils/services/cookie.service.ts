import { Injectable } from '@nestjs/common'
import { Response } from 'express'

@Injectable()
export class CookieService {
  save(name: string, token: string, res: Response) {
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie(name, token, {
      httpOnly: true,
      secure: isProduction,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      sameSite: isProduction ? 'none' : 'lax'
    });
  }
}
