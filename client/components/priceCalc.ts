export const priceCalc = (price: number, discount: number): number =>
  price - Math.ceil((price * discount) / 100)
