import { MultiSelect } from './MultiSelect'

export const PurchasedProducts = () => {
  return (
    <div className="flex flex-col min-h-screen justiy-center items-center gap-4">
      <ProductMultiSelect
        products={[
          { id: '1', name: 'Product 1' },
          { id: '2', name: 'Product 2' },
          { id: '3', name: 'Product 3' },
          { id: '4', name: 'Product 4' },
          { id: '5', name: 'Product 5' },
        ]}
      />

      <UserMultiSelect
        users={[
          { id: '1', name: 'User 1' },
          { id: '2', name: 'User 2' },
          { id: '3', name: 'User 3' },
        ]}
      />
    </div>
  )
}
