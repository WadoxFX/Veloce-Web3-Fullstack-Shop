import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { ProductDto } from './dto/product.dto'
import { ProductsService } from './products.service'
import { ProductOption, ProductType } from 'interfaces/product.interface'

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
  productsList(@Query() prams: ProductOption): Promise<ProductType[]> {
    console.log('page', prams.page);
    
    return this.productsService.findProducts(
      prams.page,
      prams.limit,
      prams.filters,
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
  create(@UploadedFiles() files: Express.Multer.File[], @Body() productDto: ProductDto): ProductType {
    return this.productsService.createProduct(productDto, files)
  }
}
