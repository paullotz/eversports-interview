'use client'

import { useEffect, useState } from 'react'
import { ProductMultiSelect } from './ProductMultiSelect'
import { Label } from './ui/label'
import { Separator } from './ui/separator'
import { UserMultiSelect } from './UserMultiSelect'
import type { Product, User } from '@shared/types'
import { PurchasedProductOverview } from './PurchasedProductsOverview'

export const PurchasedProducts = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])

  useEffect(() => {
    if (selectedProducts.length === 0 || selectedUsers.length === 0) return
  }, [selectedProducts, selectedUsers])

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-2 ">
        <div className="flex flex-col gap-2 w-full sm:w-1/2">
          <Label>Products</Label>
          <ProductMultiSelect onSetSelectedProducts={setSelectedProducts} />
        </div>

        <div className="flex flex-col gap-2 w-full sm:w-1/2">
          <Label>Users</Label>
          <UserMultiSelect onSelectedUsers={setSelectedUsers} />
        </div>
      </div>

      <Separator className="w-full my-4" />

      <PurchasedProductOverview
        products={[]}
        selectedProducts={selectedProducts}
        selectedUsers={selectedUsers}
      />
    </div>
  )
}
