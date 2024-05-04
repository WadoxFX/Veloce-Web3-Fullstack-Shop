import { Injectable } from '@nestjs/common'
import { Response } from 'express'

@Injectable()
export class CookieService {
  save(name: string, token: string, res: Response) {
    res.cookie(name, token, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      sameSite: 'none',
    })
  }
}
