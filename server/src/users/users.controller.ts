import { Body, Controller, HttpCode, HttpStatus, Put } from '@nestjs/common'
import { UserProfileEditDto } from './dto/user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Put('edit')
  @HttpCode(HttpStatus.OK)
  editProfile(@Body() userProfileDto: UserProfileEditDto) {
    return this.usersService.editProfile(userProfileDto)
  }
}
