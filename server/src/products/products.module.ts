import { Module } from '@nestjs/common'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { MongooseModule } from '@nestjs/mongoose'
import { Product, ProductSchema } from 'src/utils/schemas/product.schema'
import { UsersService } from 'src/users/users.service'
import { User, UserSchema } from 'src/utils/schemas/user.schema'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({ secret: process.env.JWT_SECRET_KEY }),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cd) => {
          cd(null, Date.now() + '-' + file.originalname)
        },
      }),
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, UsersService],
})
export class ProductsModule {}
