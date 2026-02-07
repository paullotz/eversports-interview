'use client'

import { PURCHASES_QUERY } from '@/lib/queries'
import { useQuery, NetworkStatus } from '@apollo/client'
import { Product, User } from '@shared/types'
import { FC, useMemo } from 'react'
import { Skeleton } from '../../ui/skeleton'
import { SearchX, AlertCircle, RefreshCcw } from 'lucide-react'
import { Button } from '../../ui/button'
import { PurchasedProductListContent } from './content'

interface Props {
  selectedProducts: Product[]
  selectedUsers: User[]
  onClearFilters: () => void
}

export const PurchasedProductList: FC<Props> = ({
  selectedProducts,
  selectedUsers,
  onClearFilters,
}) => {
  const productIds = useMemo(
    () => selectedProducts.map((p) => p.id),
    [selectedProducts],
  )
  const userIds = useMemo(() => selectedUsers.map((u) => u.id), [selectedUsers])

  const { data, loading, error, refetch, fetchMore, networkStatus } = useQuery(
    PURCHASES_QUERY,
    {
      variables: {
        first: 12,
        productIds,
        userIds,
      },

      notifyOnNetworkStatusChange: true,
    },
  )

  const isLoadingMore = networkStatus === NetworkStatus.fetchMore
  const isInitialLoad = loading && !data
  const isRefetching = networkStatus === NetworkStatus.refetch

  const purchases = data?.purchases?.nodes ?? []
  const hasNextPage = data?.purchases?.pageInfo?.hasNextPage ?? false
  const endCursor = data?.purchases?.pageInfo?.endCursor

  const loadMore = async () => {
    if (!hasNextPage || isLoadingMore) {
      return
    }

    await fetchMore({
      variables: {
        after: endCursor,
        first: 12,
        productIds,
        userIds,
      },
    })
  }

  if (isInitialLoad || isRefetching) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border rounded p-4 flex flex-col gap-2">
            <Skeleton className="h-[50px] w-[50px] rounded-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (purchases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10 h-64">
        <SearchX className="h-10 w-10 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold">No purchases found</h3>
        <p className="text-sm text-muted-foreground max-w-sm mt-2">
          Try adjusting your filters or clearing them to see more results.
        </p>
        <Button
          type="button"
          onClick={() => {
            onClearFilters()
          }}
          className="mt-4"
          variant="outline"
        >
          Clear filters
        </Button>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-destructive/5 h-64">
        <AlertCircle className="h-10 w-10 text-destructive mb-4" />
        <h3 className="text-lg font-semibold text-destructive">
          Error loading purchases
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm mt-2 mb-4">
          There was a problem fetching the data. Please try again.
        </p>
        <Button
          type="button"
          onClick={() => refetch()}
          variant="outline"
          size="sm"
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <PurchasedProductListContent
      purchases={purchases}
      hasNextPage={hasNextPage}
      isLoadingMore={isLoadingMore}
      onLoadMore={loadMore}
    />
  )
}
