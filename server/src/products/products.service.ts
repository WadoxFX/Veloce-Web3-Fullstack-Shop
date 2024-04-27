import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ProductDto } from './dto/product.dto'
import { FiltersType, ProductSize, ProductType } from 'interfaces/product.interface'
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

  async findProducts(page: number, limit: number, filters: FiltersType): Promise<ProductType[]> {
    let queryFilters = {}
    
    if (filters?.color) queryFilters['color'] = { $in: filters.color }
    if (filters?.gender) queryFilters['gender'] = { $in: filters.gender }
    if (filters?.collection) queryFilters['collection'] = { $in: filters.collection }

    const products = await this.productModel.find(queryFilters).limit(limit).skip((page - 1) * limit)
    if (!products) {
      throw new HttpException('No products found', HttpStatus.NOT_FOUND)
    }

    return products
  }

  async findNewProducts(): Promise<ProductType[]> {
    const products = await this.productModel.find().sort({ createdAt: -1 }).limit(6)

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
