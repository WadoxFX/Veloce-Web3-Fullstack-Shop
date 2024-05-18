import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ProductFavorite } from '../products/interfaces'
import { UserDto, UserProfileEditDto } from './dto'
import { User } from './schemas/user.schema'
import { UserType } from './interfaces'
import { Model, Types } from 'mongoose'
import { hashSync } from 'bcrypt'

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

  async delete(id: Types.ObjectId) {
    return await this.userModel.findByIdAndDelete(id)
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

    return user
  }

  async addInLikedList(ids: ProductFavorite) {
    return await this.userModel.findByIdAndUpdate(
      ids.userId,
      { $addToSet: { likedList: ids.productId } },
      { new: true },
    )
  }

  async removeFromLikedList(ids: ProductFavorite) {
    return await this.userModel.findByIdAndUpdate(ids.userId, {
      $pull: { likedList: ids.productId },
    })
  }
}
