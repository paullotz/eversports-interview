'use client'

import { FC } from 'react'
import { MultiSelect, MultiSelectItem } from './MultiSelect'
import type { Product } from '@shared/types'

interface Props {
  onSetSelectedProducts: (products: Product[]) => void
}

export const ProductMultiSelect: FC<
  Props & { products: Product[]; selectedProducts: Product[] }
> = ({ onSetSelectedProducts, products }) => {
  return (
    <MultiSelect<Product & MultiSelectItem>
      items={products}
      itemFamily="Products"
      onCancelSelection={() => onSetSelectedProducts([])}
      onItemsApplied={(selected) => onSetSelectedProducts(selected)}
    />
  )
}
