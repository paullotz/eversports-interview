import { Card, CardFooter } from '@/components/ui/card'
import { Purchase } from '@shared/types'
import Image from 'next/image'
import { FC } from 'react'

interface Props {
  purchase: Purchase
}

export const ProductCard: FC<Props> = ({ purchase }) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={purchase.product.imageUrl}
          alt={purchase.product.name}
          fill
          className="object-cover"
        />
      </div>
      <CardFooter className="flex flex-col items-start gap-1 p-4">
        <h3 className="font-semibold">{purchase.product.name}</h3>
        <p className="text-sm text-muted-foreground">
          Purchased by: {purchase.user.firstName} {purchase.user.lastName}
        </p>
      </CardFooter>
    </Card>
  )
}
