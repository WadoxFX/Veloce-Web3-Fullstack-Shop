import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { Order, OrderSchema } from './schemas/order.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
