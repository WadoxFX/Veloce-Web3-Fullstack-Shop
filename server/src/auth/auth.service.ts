import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compareSync } from 'bcrypt'
import { Response } from 'express'
import { Token, UserType } from 'src/users/interfaces'
import { UserDto } from 'src/users/dto/user.dto'
import { UsersService } from 'src/users/users.service'
import { CookieService } from 'src/utils/services/cookie.service'
import { LoginDto } from './dto'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private cookieService: CookieService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findOne(email)

    if (!user) {
      throw new HttpException(
        `User with email: ${email} not found`,
        HttpStatus.NOT_FOUND,
      )
    }

    const validPassword = compareSync(password, user.password)
    if (!validPassword) {
      throw new HttpException('Incorrect password', HttpStatus.CONFLICT)
    }

    return user
  }

  async signUp(userDto: UserDto, res: Response): Promise<Token> {
    const user = await this.usersService.findOne(userDto.email)

    if (user) {
      throw new HttpException(
        `User with email: ${userDto.email} already exists`,
        HttpStatus.NOT_FOUND,
      )
    }

    const { _id } = await this.usersService.create(userDto)

    const token: string = this.jwtService.sign({ id: _id })
    this.cookieService.save('token', token, res)

    return { token }
  }

  async profile(id: string): Promise<UserType> {
    return await this.usersService.findById(id)
  }

  async deleteAccount(loginDto: LoginDto) {
    const { _id, password } = await this.usersService.findOne(loginDto.email)
    if (!_id) throw new HttpException('User not found', HttpStatus.NOT_FOUND)

    const validPassword = compareSync(loginDto.password, password)
    if (!validPassword) {
      throw new HttpException('Incorrect password', HttpStatus.CONFLICT)
    }

    return await this.usersService.delete(_id)
  }
}
