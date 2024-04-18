import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ProductsModule } from './products/products.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_LINK),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
