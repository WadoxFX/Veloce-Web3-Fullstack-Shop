import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { ProductDto } from './dto/product.dto'
import { ProductsService } from './products.service'
import { CommentType, ProductFavorite, ProductOption, ProductType } from 'interfaces/product.interface'
import { CommentDto, DeleteCommentDto } from './dto/comment.dto'

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  product(@Param('id') id: string): Promise<ProductType> {
    return this.productsService.findProduct(id)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  productsList(@Query() params: ProductOption): Promise<ProductType[]> {
    return this.productsService.findProducts(
      params.page,
      params.limit,
      params.filters,
      params.filters?.option,
    )
  }

  @Get('new/list')
  @HttpCode(HttpStatus.OK)
  newProductsList(): Promise<ProductType[]> {
    return this.productsService.findNewProducts()
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FilesInterceptor('file'))
  create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() productDto: ProductDto,
  ): ProductType {
    return this.productsService.createProduct(productDto, files)
  }

  @Put('addInFavorite')
  @HttpCode(HttpStatus.OK)
  addInFavorite(@Body() ids: ProductFavorite) {
    return this.productsService.addInFavorite(ids)
  }

  @Put('removeFromFavorites')
  @HttpCode(HttpStatus.OK)
  removeFromFavorites(@Body() ids: ProductFavorite) {
    return this.productsService.removeFromFavorites(ids)
  }

  @Get('liked/list')
  @HttpCode(HttpStatus.OK)
  likedList(
    @Query('token') token: string,
  ): Promise<
    Omit<ProductType, 'collection' | 'color' | 'sizes' | 'comments'>[]
  > {
    return this.productsService.getUserLikedProducts(token)
  }

  @Put('addComment')
  @HttpCode(HttpStatus.OK)
  addComment(@Body() commentDto: CommentDto): Promise<CommentType> {
    return this.productsService.addComment(commentDto)
  }

  @Put('deleteComment')
  @HttpCode(HttpStatus.OK)
  deleteComment(@Body() deleteCommentDto: DeleteCommentDto) {
    return this.productsService.deleteComment(deleteCommentDto)
  }
}
