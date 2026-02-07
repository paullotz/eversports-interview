import { Card, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const PurchasedProductListLoader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="relative h-48 w-full">
            <Skeleton className="h-full w-full" />
          </div>
          <CardFooter className="flex flex-col items-start gap-1 p-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
