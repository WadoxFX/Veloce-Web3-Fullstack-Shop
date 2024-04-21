interface Children {
  children: React.ReactNode
}

interface Params {
  params: {
    id: string
  }
}

type NavItems = NavItem[]
interface NavItem {
  title: string
  link: string
  icon: string
}

type Products = Product[]
interface Product {
  _id: string
  title: string
  price: number
  desc: string
  gender: string
  color: string
  brand: string
  discount: number | null
  collection: string
  images: string[]
  sizes: Size[]
}

interface Size {
  size
  quantity
}

interface ProductParametersProps {
  product: Product
}

type BasketProducts = BasketProduct[]
interface BasketProduct {
  _id: string
  title: string
  price: number
  image: string
  size: string
  desc: string
  gender: string
  color: string
  brand: string
  discount: number | null
  collection: string
}

interface IconProps {
  size: number
}

interface Profile {
  _id: string
  username: string
  surname: string
  email: string
  address: string
}
