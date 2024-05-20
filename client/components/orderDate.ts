export const orderDate = (date: Date) => {
  const unixDate = new Date(date)
  const option = Intl.DateTimeFormat('ua', { month: 'short', day: 'numeric', year: 'numeric' })
  return option.format(unixDate)
}
