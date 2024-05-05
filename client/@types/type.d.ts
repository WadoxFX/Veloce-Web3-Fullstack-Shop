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

type LikedProducts = LikedProduct[]
type LikedProduct = Omit<Product, 'collection' | 'sizes' | 'color'>

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
  addedToFavorite: string[]
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

type IconVariant = 'outlined' | 'contained'
interface IconProps {
  size?: number
  color?: string
  contained?: boolean
}

type UserRole = 'User' | 'Admin'
type User = UserProfile & {}
interface UserInfos {
  city: string
  country: string
  phone: string
}

interface UserProfile {
  _id: string
  role: UserRole
  username: string
  surname: string
  phone: string
  likedList: string[]
  infos: UserInfos
}

interface BasketAsideProps {
  sum: number
}

interface PromoCode {
  code: string
  discount: number
}

interface FilterAsideState {
  isOn: boolean
  delay: boolean
}

interface FiltersList {
  gender?: string[]
  size?: string[]
  color?: string[]
  collection?: string[]
}

interface BasketItemProps {
  product: BasketProduct
  id: number
  clear: (id: number) => void
}
