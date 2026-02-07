'use client'

import { FC } from 'react'
import { MultiSelect } from '../multi-select'
import type { Product } from '@shared/types'
import { MultiSelectItem } from '../types'

interface Props {
  products: Product[]
  selectedProducts: Product[]
  onChange: (products: Product[]) => void
  loading?: boolean
}

export const ProductMultiSelect: FC<Props> = ({
  products,
  selectedProducts,
  onChange,
  loading = false,
}) => {
  return (
    <MultiSelect<Product & MultiSelectItem>
      items={products}
      itemFamily="Products"
      selected={selectedProducts}
      onCancel={() => onChange([])}
      onChange={(selected) => onChange(selected)}
      loading={loading}
    />
  )
}
