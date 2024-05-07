export const convertDate = (date: Date): string => {
  const unixDate = new Date(date)
  const option = Intl.DateTimeFormat('ua', { day: '2-digit', month: '2-digit', year: '2-digit' })
  return option.format(unixDate)
}
