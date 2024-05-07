export const totalPriceCalc = (sum: number, delivery: number | null, discount?: number): number => {
  const total = sum + (delivery || 0)
  const difference = (total * (discount || 0)) / 100
  return Number((total - difference).toFixed(2))
}
