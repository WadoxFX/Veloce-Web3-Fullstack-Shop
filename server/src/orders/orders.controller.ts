import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'

@Controller('orders')
export class OrdersController {
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  newOrder(@Body() data: any) {
    console.log(data)

    return data
  }
}
