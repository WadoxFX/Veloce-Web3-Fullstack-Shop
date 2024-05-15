import { priceCalc } from './priceCalc'

export const calcSum = (products: BasketProducts): number => {
  let sum: number = 0

  for (let i = 0; products.length > i; i += 1) {
    sum += priceCalc(products[i].price, products[i].discount || 0)
  }

  return sum
}
