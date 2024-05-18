import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserDto } from 'src/users/dto/user.dto'
import { Response } from 'express'
import { AuthGuard } from 'src/utils/guards/auth.guard'
import { UserId } from 'src/utils/decorators/userId.decorator'
import { Token, UserType } from 'src/users/interfaces'
import { LoginDto } from './dto'
import { CookieService } from 'src/utils/services/cookie.service'
import { JwtService } from '@nestjs/jwt'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response): Promise<Token> {
    const { _id } = await this.authService.login(loginDto.email, loginDto.password)

    const token = this.jwtService.sign({ id: _id })
    this.cookieService.save('token', token, res)

    return { token }
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(
    @Body() userDto: UserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Token> {
    return this.authService.signUp(userDto, res)
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async profile(@UserId() id: string): Promise<UserType> {
    const user = await this.authService.profile(id)
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)

    return user
  }

  @Delete('deleteAccount')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAccount(@Body() loginDto: LoginDto) {
    return this.authService.deleteAccount(loginDto)
  }
}
