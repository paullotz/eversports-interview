'use client'

import { ProductMultiSelect } from './ProductMultiSelect'
import { Label } from './ui/label'
import { Separator } from './ui/separator'
import { UserMultiSelect } from './UserMultiSelect'

export const PurchasedProducts = () => {
  return (
    <div>
      <div className="flex flex-row gap-2 ">
        <div className="flex flex-col gap-2 w-1/2">
          <Label>Products</Label>
          <ProductMultiSelect />
        </div>

        <div className="flex flex-col gap-2 w-1/2">
          <Label>Users</Label>
          <UserMultiSelect
            users={[
              { id: '1', name: 'User 1' },
              { id: '2', name: 'User 2' },
              { id: '3', name: 'User 3' },
            ]}
          />
        </div>
      </div>

      <Separator className="w-full my-4" />
    </div>
  )
}
