import { Product } from '@/lib/types'
import { FC } from 'react'
import { MultiSelect } from './MultiSelect'

interface Props {
  products: Product[]
}

export const ExampleProductList: FC<Props> = ({ products }) => {
  return (
    <>
      <MultiSelect items={products} />

      <ul>
        {products.map((product) => (
          <li key={product.id} className="p-2 bg-white">
            {product.id} - {product.name}
          </li>
        ))}
      </ul>
    </>
  )
}
