import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Order } from './schemas/order.schema'
import { Model, ObjectId, PopulateOptions } from 'mongoose'
import { OrderDto } from './dto'
import { MailOrder, ContractOrder } from './interfaces'

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModule: Model<Order>) {}

  createOrder(orderDto: OrderDto): Promise<MailOrder | ContractOrder> {
    const { username, surname, phone, ...orderData } = orderDto

    return new this.orderModule({
      ...orderData,
      buyer: { username, surname, phone },
    }).save()
  }

  findOrders(limit = 0, page = 0) {
    return this.orderModule
      .find()
      .limit(limit)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
  }

  findOrder(orderId: ObjectId, populate: PopulateOptions = null) {
    return this.orderModule.findById(orderId).populate(populate)
  }

  deleteOrder(orderId: ObjectId) {
    return this.orderModule.findByIdAndDelete(orderId)
  }
}
