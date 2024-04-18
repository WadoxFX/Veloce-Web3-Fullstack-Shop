import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { ProductDto } from './dto/product.dto'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post('create')
  @UseInterceptors(FilesInterceptor('file'))
  create(@UploadedFiles() files: Express.Multer.File[], @Body() productDto: ProductDto) {
    return this.productsService.createProduct(productDto, files)
  }
}
