export const orderPrice = (sum: number, fixed: number = 2): number =>
  Number((sum > 200 ? sum : sum + 20).toFixed(fixed))
