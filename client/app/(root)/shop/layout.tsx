import type { Metadata } from 'next'

import FilterAside from '@/components/FilterAside'
import FiltersRibbon from '@/components/FiltersRibbon'
import { FilterModal } from '@/components/ui'
import style from '@/styles/pages/shop.module.scss'

export const metadata: Metadata = {
  title: 'Veloce - Shop',
  keywords: 'sneakers, shoes, Veloce, sports, sports shoe store, Nike, Adidas, Puma',
  description: 'Sports shoe store, original products from famous brands - Veloce',
}

const ShopLayout = ({ children }: Children) => (
  <>
    <FilterModal />
    <FiltersRibbon />
    <div className={style.container}>
      <FilterAside />
      {children}
    </div>
  </>
)

export default ShopLayout
