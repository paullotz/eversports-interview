import { Product, User } from '@shared/types'
import Image from 'next/image'
import { FC } from 'react'

interface Props {
  products: Product[]
  selectedUsers: User[]
  selectedProducts: Product[]
}

export const PurchasedProductOverview: FC<Props> = ({
  products,
  selectedProducts,
  selectedUsers,
}) => {
  const nothingSelected =
    selectedProducts.length === 0 || selectedUsers.length === 0
  const noProducts = products.length === 0

  if (noProducts) {
    return <p className="text-muted-foreground">No products found.</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {nothingSelected &&
        products.map((product) => (
          <div key={product.id} className="border rounded p-4">
            <Image
              className="text-sm text-muted-foreground"
              src={product.imageUrl}
              alt={product.name}
            />
            <h2 className="text-lg font-bold">{product.name}</h2>
          </div>
        ))}
    </div>
  )
}
