import { Product } from '@/lib/types'
import { FC } from 'react'
import { UserMultiSelect } from './UserMultiSelect'
import { ProductMultiSelect } from './ProductMultiSelect'

interface Props {
  products: Product[]
  // users: User[]
}

export const ExampleProductList: FC<Props> = ({ products }) => {
  return (
    <>
      <UserMultiSelect users={products} />
      {/* <ProductMultiSelect products={products} /> */}
    </>
  )
}
