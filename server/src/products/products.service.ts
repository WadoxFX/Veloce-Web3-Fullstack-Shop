import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ProductDto } from './dto/product.dto'
import {
  CommentType,
  FiltersType,
  OptionType,
  ProductFavorite,
  ProductSize,
  ProductType,
} from 'interfaces/product.interface'
import { InjectModel } from '@nestjs/mongoose'
import { Product } from 'src/utils/schemas/product.schema'
import { Model, ObjectId } from 'mongoose'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { CommentDto, DeleteCommentDto } from './dto/comment.dto'
import * as fs from 'fs'

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  createProduct(
    productDto: ProductDto,
    files: Express.Multer.File[],
  ): ProductType {
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

  async deleteproduct(id: ObjectId) {
    const product: ProductType = await this.productModel.findById(id)

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
    }

    if (product.images.length) {
      for (let i = 0; product.images.length > i; i++) {
        await fs.promises.unlink(product.images[i])
      }
    }

    return await this.productModel.findByIdAndDelete(id)
  }

  async findProducts(
    page: number,
    limit: number,
    filters: FiltersType,
    option: OptionType,
  ): Promise<ProductType[]> {
    const queryFilters = {}

    if (filters?.color) queryFilters['color'] = { $in: filters.color }
    if (filters?.gender) queryFilters['gender'] = { $in: filters.gender }
    if (filters?.collection)
      queryFilters['collection'] = { $in: filters.collection }
    if (filters?.size) {
      queryFilters['sizes'] = {
        $elemMatch: {
          size: filters.size,
          quantity: { $gt: 0 },
        },
      }
    }

    let sortOption = {}
    if (option) {
      switch (option) {
        case 'High-Low':
          sortOption = { price: -1 }
          break
        case 'Low-High':
          sortOption = { price: 1 }
          break
        case 'Newest':
          sortOption = { createdAt: -1 }
          break

        default:
          sortOption = {}
          break
      }
    }

    const products = await this.productModel
      .find(queryFilters)
      .limit(limit)
      .sort(sortOption)
      .skip((page - 1) * limit)

    if (!products) {
      throw new HttpException('No products found', HttpStatus.NOT_FOUND)
    }

    return products
  }

  async findNewProducts(): Promise<ProductType[]> {
    const products = await this.productModel
      .find()
      .sort({ createdAt: -1 })
      .limit(6)

    if (!products) {
      throw new HttpException('No products found', HttpStatus.NOT_FOUND)
    }

    return products
  }

  async findProduct(id: string): Promise<ProductType> {
    const product = await this.productModel.findById(id).populate({
      path: 'comments',
      options: { sort: { createdAt: 1 } },
    })

    if (!product) {
      throw new HttpException(
        `Product id:${id} could not be found`,
        HttpStatus.NOT_FOUND,
      )
    }

    return product
  }

  async addInFavorite(ids: ProductFavorite) {
    const product = await this.productModel.findByIdAndUpdate(
      ids.productId,
      { $addToSet: { addedToFavorite: ids.userId } },
      { new: true },
    )

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
    }

    this.usersService.addInLikedList(ids)

    return { success: true }
  }

  async removeFromFavorites(ids: ProductFavorite) {
    const product = await this.productModel.findByIdAndUpdate(ids.productId, {
      $pull: { addedToFavorite: ids.userId },
    })

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
    }

    this.usersService.removeFromLikedList(ids)

    return { success: true }
  }

  async getUserLikedProducts(token: string) {
    const data = await this.jwtService.verifyAsync(token)

    const user = await this.usersService.findById(data.id)
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)

    const likedProducts = await this.productModel
      .find({ _id: user.likedList })
      .select('title price desc gender discount images addedToFavorite')
    return likedProducts
  }

  async addComment(commentDto: CommentDto): Promise<CommentType> {
    const { productId, ...comment } = commentDto

    const product = await this.productModel.findByIdAndUpdate(
      productId,
      { $push: { comments: comment } },
      { new: true },
    )

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
    }

    return comment
  }

  async deleteComment(deleteCommentDto: DeleteCommentDto) {
    const { commentId, productId, userId } = deleteCommentDto

    const product = await this.productModel.findByIdAndUpdate(productId, {
      $pull: { comments: { _id: commentId, creator: userId } },
    })

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
    }

    return { success: true }
  }
}
