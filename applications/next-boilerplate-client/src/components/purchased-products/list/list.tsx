'use client'

import { PURCHASES_QUERY } from '@/lib/queries'
import { useQuery, NetworkStatus } from '@apollo/client'
import { Product, User } from '@shared/types'
import { FC, useMemo } from 'react'
import { PurchasedProductListContent } from './content'
import { PurchasedProductListLoader } from './loader'
import { PurchasedProductListError } from './error'
import { PurchasedProductListEmpty } from './empty'

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
    return <PurchasedProductListLoader />
  }

  if (purchases.length === 0) {
    return <PurchasedProductListEmpty onClearFilters={onClearFilters} />
  }

  if (error) {
    return <PurchasedProductListError refetch={refetch} />
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
