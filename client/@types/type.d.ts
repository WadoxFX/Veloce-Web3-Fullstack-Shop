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
  role?: string
}

type LikedProducts = LikedProduct[]
type LikedProduct = Omit<Product, 'collection' | 'sizes' | 'color'>

type ProductComments = ProductComment[]
interface ProductComment {
  _id: string
  creator: string
  grade: number
  content: string
  createdAt: Date
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
  comments?: Comments
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
  onClear: (id: number) => void
}

type Prices = Price[]
interface Price {
  min: number
  max?: number
}

interface DrawStarsProps {
  quantity: number
  grade: number
  size: number
}

interface CreateCommentProps {
  productId: string
}

interface CommentSchema {
  content: string
  productId: string
  grade: string
  creator: string
}

interface CommentItem {
  comment: ProductComment
  productId: string
}

interface deleteComment {
  productId: string
  commentId: string
  userId: string
}

interface CyTestUser {
  role: string
  username: string
  surname: string
  email: string
  password: string
  infos: TestUserInfos
  comment: string
  productComment: string
}

interface TestUserInfos {
  city: string
  country: string
  phone: string
  post: string
}

interface PaymentMethodProps {
  method: string
  address: string | undefined
  onConnect: () => void
  register: UseFormRegister<{
    method: string
  }>
}

interface ExchangeRates {
  USD: number
  ETH: number
}

interface EthereumRateProps {
  sum: number
  rate: ExchangeRates
}

interface Ethereum {
  request: (method: unknown) => Promise<unknown>
}

interface PaymentFormProps {
  userData: UserProfile | null
  rate: ExchangeRates
}

interface PayedStatus {
  address?: string
  orderId?: number
  message?: string
}

type Orders = Order[]
interface Order {
  _id: string
  city: string
  method: string
  price: number
  post: string
  buyer: Buyer
  productIds: {
    _id: string
    images: string[]
  }[]
  paid?: boolean
  address?: string
  orderId?: number
  createdAt: Date
}

interface Buyer {
  username: string
  surname: string
  phone: string
}

interface ViewNewOrderProps {
  order: Order | null
  loading: boolean
}

interface NavItemListProps {
  navItams: NavItems
  userRole: string
}
