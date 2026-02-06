import { FC } from 'react'
import { MultiSelect, MultiSelectItem } from './MultiSelect'

interface Product extends MultiSelectItem {
  id: string
  name: string
  price: number
}

interface Props {
  products: Product[]
}

export const ProductMultiSelect: FC<Props> = ({ products }) => {
  return (
    <MultiSelect<Product>
      items={products}
      itemFamily="Products"
      onItemsApplied={(selected) => console.log(selected)}
    />
  )
}
