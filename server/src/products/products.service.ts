import { Injectable } from '@nestjs/common'
import { ProductDto } from './dto/product.dto'
import { ProductSize } from 'interfaces/product.interface'
import { InjectModel } from '@nestjs/mongoose'
import { Product } from 'src/utils/schemas/product.schema'
import { Model } from 'mongoose'

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async createProduct(productDto: ProductDto, files: Express.Multer.File[]) {
    const paths: string[] = files.map((file) => file.path)
    const sizes: ProductSize[] = JSON.parse(productDto.sizes)

    const newProduct = new this.productModel({
      ...productDto,
      sizes: sizes,
      images: paths,
    })

    newProduct.save()

    return { message: 'Product created' }
  }
}
