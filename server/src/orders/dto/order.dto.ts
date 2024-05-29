export class OrderDto {
  address?: string
  orderId?: string
  phone: string
  city: string
  mail: string
  price: number
  surname: string
  username: string
  method: 'MetaMask' | 'Mail'
}
