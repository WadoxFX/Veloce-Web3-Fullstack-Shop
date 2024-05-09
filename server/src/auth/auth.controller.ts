import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
import { Token, UserType } from 'interfaces/user.interface'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  logIn(@Body() userDto: Omit<UserDto, 'username' | 'surname'>, @Res({ passthrough: true }) res: Response ) {
    return this.authService.logIn(userDto.email, userDto.password, res)
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() userDto: UserDto, @Res({ passthrough: true }) res: Response): Promise<Token> {
    return this.authService.signUp(userDto, res)
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async profile(@UserId() id: string): Promise<UserType> {
    return this.authService.profile(id)
  }

  @Delete('deleteAccount')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAccount(@Body() userDto: Omit<UserDto, 'username' | 'surname'>) {
    return this.authService.deleteAccount(userDto)
  }
}
