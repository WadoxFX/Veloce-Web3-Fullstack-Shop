import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ProductDto, AddCommentDto, DeleteCommentDto } from './dto'
import { Product } from './schemas/product.schema'
import {
  CommentType,
  FiltersType,
  OptionType,
  ProductFavorite,
  ProductSize,
  ProductType,
} from './interfaces'
import { Model, ObjectId, PopulateOptions } from 'mongoose'

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async findProductById(id: ObjectId, populate?: PopulateOptions ): Promise<ProductType> {
    return await this.productModel.findById(id).populate(populate ?? null)
  }

  async findNewProducts(): Promise<ProductType[]> {
    return await this.productModel.find().sort({ createdAt: -1 }).limit(6)
  }

  createProduct(productDto: ProductDto, images: string[], sizes: ProductSize[]): Promise<ProductType> {
    return new this.productModel({ ...productDto, images, sizes }).save()
  }

  async deleteProduct(productId: ObjectId) {
    return await this.productModel.findByIdAndDelete(productId)
  }

  async findProducts( page: number, limit: number, filters: FiltersType, option: OptionType ): Promise<ProductType[]> {
    const queryFilters = {}

    if (filters?.color) queryFilters['color'] = { $in: filters.color }
    if (filters?.gender) queryFilters['gender'] = { $in: filters.gender }
    if (filters?.collection) queryFilters['collection'] = { $in: filters.collection }
    if (filters?.size) { queryFilters['sizes'] = {
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

    return await this.productModel
      .find(queryFilters)
      .limit(limit)
      .sort(sortOption)
      .skip((page - 1) * limit)
  }

  async addInFavorite(ids: ProductFavorite) {
    return await this.productModel.findByIdAndUpdate(
      ids.productId,
      { $addToSet: { addedToFavorite: ids.userId } },
      { new: true },
    )
  }

  async removeFromFavorites(ids: ProductFavorite) {
    return await this.productModel.findByIdAndUpdate(ids.productId, {
      $pull: { addedToFavorite: ids.userId },
    })
  }

  async getUserLikedProducts(likedList: ObjectId[]) {
    return await this.productModel
      .find({ _id: likedList })
      .select('title price desc gender discount images addedToFavorite')
  }


  async addComment(commentDto: AddCommentDto): Promise<CommentType> {
    const { productId, ...comment } = commentDto

    return await this.productModel.findByIdAndUpdate(
      productId,
      { $push: { comments: comment } },
      { new: true },
    )
  }

  async deleteComment(deleteCommentDto: DeleteCommentDto) {
    const { commentId, productId, userId } = deleteCommentDto

    return await this.productModel.findByIdAndUpdate(productId, {
      $pull: { comments: { _id: commentId, creator: userId } },
    })
  }
}
