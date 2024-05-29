export class OrderDto {
  address?: string
  orderId?: string
  phone: string
  city: string
  post: string
  price: number
  surname: string
  username: string
  method: 'MetaMask' | 'Mail'
}
