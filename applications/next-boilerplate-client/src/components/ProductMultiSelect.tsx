'use client'

import { FC } from 'react'
import { MultiSelect, MultiSelectItem } from './MultiSelect'
import type { Product } from '@shared/types'
import { useQuery } from '@apollo/client'
import { PRODUCTS_QUERY } from '@/lib/queries'

export const ProductMultiSelect: FC = () => {
  const {
    error,
    data: { products: { nodes: products } = { nodes: [] } } = {},
    loading: isProductsLoading,
  } = useQuery(PRODUCTS_QUERY, { variables: { first: 10 } })

  if (error) return <p>Error: {error.message}</p>

  if (isProductsLoading) return <p>Loading...</p>

  if (!products) return <p>No products found.</p>

  return (
    <MultiSelect<Product & MultiSelectItem>
      items={products}
      itemFamily="Products"
      onItemsApplied={(selected) => console.log(selected)}
    />
  )
}
