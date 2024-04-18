import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ProductDto } from './dto/product.dto'
import { ProductSize, ProductType } from 'interfaces/product.interface'
import { InjectModel } from '@nestjs/mongoose'
import { Product } from 'src/utils/schemas/product.schema'
import { Model } from 'mongoose'

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  createProduct(productDto: ProductDto, files: Express.Multer.File[]): ProductType {
    const paths: string[] = files.map((file) => file.path)
    const sizes: ProductSize[] = JSON.parse(productDto.sizes)

    const newProduct = new this.productModel({
      ...productDto,
      sizes: sizes,
      images: paths,
    })

    newProduct.save()

    return newProduct
  }

  async findProducts(): Promise<ProductType[]> {
    const products = await this.productModel.find()

    if (!products) {
      throw new HttpException('No products found', HttpStatus.NOT_FOUND)
    }

    return products
  }

  async findProduct(id: string): Promise<ProductType> {
    const product = await this.productModel.findById(id)

    if (!product) {
      throw new HttpException(
        `Product id:${id} could not be found`,
        HttpStatus.NOT_FOUND,
      )
    }

    return product
  }
}
