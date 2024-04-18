interface Children {
  children: React.ReactNode
}

interface Params {
  params: {
    id: string
  }
}

interface NavItem {
  title: string
  link: string
  icon: string
}

type NavItems = NavItem[]
