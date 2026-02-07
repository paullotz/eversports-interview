import { Purchase } from '@shared/types'
import Image from 'next/image'
import { FC } from 'react'

interface Props {
  purchases: Purchase[]
}

export const ProductCards: FC<Props> = ({ purchases }) => {
  return purchases.map((purchase: Purchase) => (
    <div key={purchase.id} className="border rounded p-4">
      <Image
        className="text-sm text-muted-foreground object-cover"
        src={purchase.product.imageUrl}
        alt={purchase.product.name}
        width={50}
        height={75}
      />
      <h2 className="text-lg font-bold">{purchase.product.name}</h2>
      <p className="text-sm text-muted-foreground">
        Purchased by: {purchase.user.firstName} {purchase.user.lastName}
      </p>
    </div>
  ))
}
