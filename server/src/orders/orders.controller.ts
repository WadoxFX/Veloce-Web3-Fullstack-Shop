import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common'
import { OrderDto } from './dto'
import { OrdersService } from './orders.service'
import { ContractOrder, MailOrder } from './interfaces'
import { ObjectId } from 'mongoose'

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async newOrder(@Body() orderDto: OrderDto ): Promise<MailOrder | ContractOrder> {
    const order = await this.orderService.createOrder(orderDto)

    if (!order) {
      throw new HttpException(
        'Error when creating an order',
        HttpStatus.CONFLICT,
      )
    }

    return order
  }

  @Delete('delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOrder(@Body('orderId') orderId: ObjectId): Promise<void> {    
    const order = await this.orderService.deleteOrder(orderId)

    if (!order) {
      throw new HttpException('Orders not found', HttpStatus.CONFLICT)
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getOrders(@Query() data): Promise<MailOrder[] | ContractOrder[]> {
    const { limit, page } = data

    const orders = await this.orderService.findOrders(limit, page)

    if (!orders) {
      throw new HttpException('Orders not found', HttpStatus.CONFLICT)
    }

    return orders
  }
}
