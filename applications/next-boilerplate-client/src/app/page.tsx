import { PurchasedProducts } from '@/components/PurchasedProducts'
import { getClient } from '@/lib/ApolloClient'
import { PRODUCTS_QUERY } from '@/lib/queries'

export default async function Home() {
  const { error, data } = await getClient().query({
    query: PRODUCTS_QUERY,
    variables: { first: 10 },
  })

  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="flex sm:items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col gap-2 p-4 bg-white shadow-md rounded-md w-full h-auto sm:min-h-[480px] sm:min-w-[584px] sm:h-auto sm:w-auto">
        <h1 className="text-2xl font-bold">Purchased Products</h1>
        <PurchasedProducts />
      </div>
    </div>
  )
}
