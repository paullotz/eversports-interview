import { Purchase } from '@shared/types'
import { Loader2 } from 'lucide-react'
import { FC } from 'react'
import { Button } from '../ui/button'
import { ProductCards } from './product-cards'

interface Props {
  purchases: Purchase[]
  hasNextPage: boolean
  isLoadingMore: boolean
  onLoadMore: () => void
}

export const PurchasedProductListContent: FC<Props> = ({
  purchases,
  hasNextPage,
  isLoadingMore,
  onLoadMore,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ProductCards purchases={purchases} />
      </div>

      {hasNextPage && (
        <div className="flex justify-center">
          <Button
            type="button"
            onClick={onLoadMore}
            variant="outline"
            disabled={isLoadingMore}
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
