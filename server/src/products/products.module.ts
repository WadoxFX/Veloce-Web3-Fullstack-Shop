import { Module } from '@nestjs/common'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { MongooseModule } from '@nestjs/mongoose'
import { Product, ProductSchema } from 'src/utils/schemas/product.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
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
  providers: [ProductsService],
})
export class ProductsModule {}
