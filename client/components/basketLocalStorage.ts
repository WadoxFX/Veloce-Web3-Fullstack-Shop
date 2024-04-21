export const basketLocalStorage = (product: BasketProduct) => {
  let basket = localStorage.getItem('basket')

  if (!basket) basket = JSON.stringify([])

  const basketData: BasketProducts = JSON.parse(basket)

  basketData.push(product)

  localStorage.setItem('basket', JSON.stringify(basketData))
}
