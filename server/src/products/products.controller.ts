import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { FilesInterceptor } from '@nestjs/platform-express'
import { ProductDto, AddCommentDto, DeleteCommentDto } from './dto'
import { ProductsService } from './products.service'
import {
  LikedList,
  ProductFavorite,
  ProductOption,
  ProductSize,
  ProductType,
} from './interfaces'
import { UsersService } from 'src/users/users.service'
import { ObjectId } from 'mongoose'
import * as fs from 'fs'

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FilesInterceptor('file'))
  async create(@UploadedFiles() files: Express.Multer.File[], @Body() productDto: ProductDto): Promise<ProductType> {
    const images: string[] = files.map((file) => file.path)
    const sizes: ProductSize[] = JSON.parse(productDto.sizes)

    const newProduct = await this.productsService.createProduct(productDto, images, sizes)
    if (!newProduct) {
      throw new HttpException(
        'There were errors while creating the product',
        HttpStatus.CONFLICT,
      )
    }

    return newProduct
  }

  @Delete('delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Body('productid') productId: ObjectId): Promise<void> {
    const product: ProductType = await this.productsService.findProductById(productId)

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
    }

    if (product.images.length) {
      for (let i = 0; product.images.length > i; i++) {
        await fs.promises.unlink(product.images[i])
      }
    }

    await this.productsService.deleteProduct(productId)
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  product(@Param('id') id: ObjectId): Promise<ProductType> {
    return this.productsService.findProductById(id, {
      path: 'comments',
      options: { sort: { createdAt: 1 } },
    })
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async productsList(@Query() params: ProductOption): Promise<ProductType[]> {
    const { page, limit, options } = params

    const products = await this.productsService.findProducts(
      page, limit, options,
      options?.option,
    )

    if (!products) {
      throw new HttpException('Products not found', HttpStatus.NOT_FOUND)
    }

    return products
  }

  @Get('new/list')
  @HttpCode(HttpStatus.OK)
  async newProductsList(): Promise<ProductType[]> {
    const products = await this.productsService.findNewProducts()

    if (!products) {
      throw new HttpException('Products not found', HttpStatus.NOT_FOUND)
    }

    return products
  }

  @Put('addInFavorite')
  @HttpCode(HttpStatus.NO_CONTENT)
  async addInFavorite(@Body() ids: ProductFavorite): Promise<void> {
    const product = await this.productsService.addInFavorite(ids)
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
    }

    const user = await this.usersService.addInLikedList(ids)
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
  }

  @Put('removeFromFavorites')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeFromFavorites(@Body() ids: ProductFavorite): Promise<void> {
    const product = await this.productsService.removeFromFavorites(ids)
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
    }

    const user = await this.usersService.removeFromLikedList(ids)
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
  }

  @Get('liked/list')
  @HttpCode(HttpStatus.OK)
  async likedList(@Query('token') token: string): Promise<LikedList> {
    const { id } = await this.jwtService.verifyAsync(token)

    const user = await this.usersService.findById(id)
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)

    return await this.productsService.getUserLikedProducts(user.likedList)
  }

  @Put('addComment')
  @HttpCode(HttpStatus.NO_CONTENT)
  async addComment(@Body() addCommentDto: AddCommentDto): Promise<void> {
    const product = await this.productsService.addComment(addCommentDto)

    if (!product) {
      throw new HttpException(
        'Failed to create a comment, product not found or deleted',
        HttpStatus.NOT_FOUND,
      )
    }
  }

  @Put('deleteComment')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteComment(@Body() deleteCommentDto: DeleteCommentDto) {
    const product = await this.productsService.deleteComment(deleteCommentDto)

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
    }
  }
}
