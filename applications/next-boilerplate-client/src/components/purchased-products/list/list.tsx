'use client'

import { NetworkStatus, useQuery } from '@apollo/client'
import type { Product, User } from '@frontend-interview/types'
import { type FC, useCallback } from 'react'
import { PURCHASES_QUERY } from '@/lib/queries'
import { PurchasedProductListContent } from './content'
import { PurchasedProductListEmpty } from './empty'
import { PurchasedProductListError } from './error'
import { PurchasedProductListLoader } from './loader'
import { useErrorBoundary } from 'react-error-boundary'

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
  const productIds = selectedProducts.map((p) => p.id)
  const userIds = selectedUsers.map((u) => u.id)

  const { showBoundary } = useErrorBoundary()
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

  const loadMore = useCallback(async () => {
    if (!hasNextPage || isLoadingMore) {
      return
    }

    try {
      await fetchMore({
        variables: {
          after: endCursor,
          first: 12,
          productIds,
          userIds,
        },
      })
    } catch (_err) {
      showBoundary('Failed to load more purchases. Please try again.')
    }
  }, [
    fetchMore,
    showBoundary,
    hasNextPage,
    endCursor,
    productIds,
    userIds,
    isLoadingMore,
  ])

  if (isInitialLoad || isRefetching) {
    return <PurchasedProductListLoader />
  }

  if (error) {
    return <PurchasedProductListError refetch={refetch} />
  }

  if (purchases.length === 0) {
    return <PurchasedProductListEmpty onClearFilters={onClearFilters} />
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
