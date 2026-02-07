'use client'

import { FC } from 'react'
import { MultiSelect } from '../multi-select'
import type { Product } from '@shared/types'
import { MultiSelectItem } from '../types'

interface Props {
  products: Product[]
  selectedProducts: Product[]
  onSetSelectedProducts: (products: Product[]) => void
  loading?: boolean
  loadingVariant?: 'skeleton' | 'inline'
}

export const ProductMultiSelect: FC<Props> = ({
  products,
  selectedProducts,
  onSetSelectedProducts,
  loading = false,
  loadingVariant = 'inline',
}) => {
  return (
    <MultiSelect<Product & MultiSelectItem>
      items={products}
      itemFamily="Products"
      selected={selectedProducts}
      onCancelSelection={() => onSetSelectedProducts([])}
      onItemsApplied={(selected) => onSetSelectedProducts(selected)}
      loading={loading}
    />
  )
}
