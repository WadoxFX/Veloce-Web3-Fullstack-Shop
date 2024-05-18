import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common'
import { OrderDto } from './dto'
import { OrdersService } from './orders.service'
import { ContractOrder, MailOrder } from './interfaces'

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.CREATED)
  async newOrder(@Body() orderDto: OrderDto): Promise<MailOrder | ContractOrder> {
    const order = await this.orderService.createOrder(orderDto)

    if (!order) {
      throw new HttpException(
        'Error when creating an order',
        HttpStatus.CONFLICT,
      )
    }

    return order
  }
}
