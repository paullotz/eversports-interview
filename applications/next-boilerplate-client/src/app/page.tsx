import { PurchasedProductsOverview } from '@/components/purchased-products/overview'
import { Separator } from '@radix-ui/react-select'

export default async function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold">Purchased Products</h1>

      <Separator className="my-8 w-full" />

      <PurchasedProductsOverview />
    </div>
  )
}
