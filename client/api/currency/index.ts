const url: string = 'https://min-api.cryptocompare.com/data/price'

export const getExchangeRates = async (currencies: string): Promise<ExchangeRates> => {
  const res = await fetch(`${url}?fsym=ETH&tsyms=${currencies}`)
  const data: ExchangeRates = await res.json()
  return data
}
