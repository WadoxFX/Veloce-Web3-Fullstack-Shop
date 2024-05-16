const url: string = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,ETH'

export const getExchangeRates = async (): Promise<ExchangeRates> => {
  const res = await fetch(url)
  const data: ExchangeRates = await res.json()
  return data
}
