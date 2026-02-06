'use client'

import { useState } from 'react'
import { ProductMultiSelect } from './ProductMultiSelect'
import { Label } from './ui/label'
import { Separator } from './ui/separator'
import { UserMultiSelect } from './UserMultiSelect'
import type { Product, User } from '@shared/types'
import { PurchasedProductOverview } from './PurchasedProductsOverview'
import { useQuery } from '@apollo/client'
import { PRODUCTS_QUERY, USERS_QUERY } from '@/lib/queries'
import { Button } from './ui/button'

export const PurchasedProducts = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])

  const {
    data: { products: { nodes: products } = { nodes: [] } } = {},
    loading: isProductsLoading,
  } = useQuery(PRODUCTS_QUERY, { variables: { first: 10 } })

  const {
    data: { users: { nodes: users } = { nodes: [] } } = {},
    loading: isUsersLoading,
  } = useQuery(USERS_QUERY, { variables: { first: 10 } })

  const clearFilters = () => {
    setSelectedProducts([])
    setSelectedUsers([])
  }

  if (isProductsLoading || isUsersLoading) return <p>Loading...</p>

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-2 items-end">
        <div className="flex flex-col gap-2 w-full sm:w-2/5">
          <Label>Products</Label>
          <ProductMultiSelect
            onSetSelectedProducts={setSelectedProducts}
            products={products}
            selectedProducts={selectedProducts}
          />
        </div>

        <div className="flex flex-col gap-2 w-full sm:w-2/5">
          <Label>Users</Label>
          <UserMultiSelect
            onSelectedUsers={setSelectedUsers}
            users={users}
            selectedUsers={selectedUsers}
          />
        </div>
        <Button
          className="w-full sm:w-1/5"
          variant="outline"
          onClick={clearFilters}
        >
          Clear filters
        </Button>
      </div>

      <Separator className="w-full my-4" />

      <PurchasedProductOverview
        selectedProducts={selectedProducts}
        selectedUsers={selectedUsers}
        onClearFilters={clearFilters}
      />
    </div>
  )
}
