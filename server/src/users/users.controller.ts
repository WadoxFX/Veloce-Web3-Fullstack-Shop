import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common'
import { UserProfileEditDto } from './dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Put('edit')
  @HttpCode(HttpStatus.NO_CONTENT)
  async editProfile(@Body() userProfileDto: UserProfileEditDto): Promise<void> {
    const updatedUser = await this.usersService.editProfile(userProfileDto)

    if (!updatedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
  }
}
