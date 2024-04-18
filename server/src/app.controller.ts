import { Controller, Get, Param, Res } from '@nestjs/common'
import { createReadStream } from 'fs'
import { Response } from 'express'
import { join } from 'path'

@Controller()
export class AppController {
  @Get('uploads/:filename')
  send(@Param('filename') filename: string, @Res() res: Response) {
    const file = createReadStream(join(process.cwd(), 'uploads', filename))
    file.pipe(res)
  }
}
