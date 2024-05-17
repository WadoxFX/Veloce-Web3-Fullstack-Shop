import { priceCalc } from './priceCalc'

export const calcSum = (products: BasketProducts): number =>
  products.reduce((acc, item) => (acc += priceCalc(item.price, item.discount ?? 0)), 0)
