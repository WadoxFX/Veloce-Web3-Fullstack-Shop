import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { UserType } from 'interfaces/user.interface'
import { Model } from 'mongoose'
import { User } from 'src/utils/schemas/user.schema'
import { UserDto, UserProfileEditDto } from './dto/user.dto'
import { hashSync } from 'bcrypt'
import { ProductFavorite } from 'interfaces/product.interface'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(email: string): Promise<UserType> {
    return await this.userModel.findOne({ email })
  }

  async findById(id: string): Promise<UserType> {
    return await this.userModel
      .findById(id)
      .select(
        'role username surname likedList infos.city infos.country infos.phone ',
      )
  }

  create(userDto: UserDto): Promise<UserType> {
    const { password, ...userData } = userDto
    const hashPassword = hashSync(password, 10)

    const newUser = new this.userModel({ ...userData, password: hashPassword })
    return newUser.save()
  }

  async editProfile(userProfileDto: UserProfileEditDto) {
    const options = {}

    if (userProfileDto?.username) options['username'] = userProfileDto.username
    if (userProfileDto?.surname) options['surname'] = userProfileDto.surname
    if (userProfileDto?.city) options['infos.city'] = userProfileDto.city
    if (userProfileDto?.country)
      options['infos.country'] = userProfileDto.country
    if (userProfileDto?.phone) options['infos.phone'] = userProfileDto.phone

    const user = await this.userModel.findByIdAndUpdate(
      userProfileDto.userId,
      { $set: options },
      { new: true },
    )

    if (!user)
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND)

    return options
  }

  async addInLikedList(ids: ProductFavorite) {
    const user = await this.userModel.findByIdAndUpdate(
      ids.userId,
      { $addToSet: { likedList: ids.productId } },
      { new: true },
    )

    if (!user)
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND)
  }

  async removeFromLikedList(ids: ProductFavorite) {
    const user = await this.userModel.findByIdAndUpdate(ids.userId, {
      $pull: { likedList: ids.productId },
    })

    if (!user)
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND)
  }

  async getUserLikedProducts(id: string) {
    const user = await this.userModel.findById(id).select('likedList')

    if (!user) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND)
    }

    const likedProducts = await this.userModel.find({ _id: user.likedList })

    return likedProducts
  }
}
