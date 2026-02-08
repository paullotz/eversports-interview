"use client";

import { NetworkStatus, useQuery } from "@apollo/client";
import type { Product } from "@frontend-interview/types";
import { type FC, useCallback, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { PRODUCTS_QUERY } from "@/lib/apollo/queries";
import { MultiSelect } from "../multi-select";

interface Props {
	selectedProducts: Product[];
	onChange: (products: Product[]) => void;
}

export const ProductMultiSelect: FC<Props> = ({
	selectedProducts,
	onChange,
}: Props) => {
	const { showBoundary } = useErrorBoundary();
	const [searchTerm, setSearchTerm] = useState("");

	const { data, loading, fetchMore, networkStatus } = useQuery(PRODUCTS_QUERY, {
		variables: { first: 50, searchTerm },
		notifyOnNetworkStatusChange: true,
	});

	const products = data?.products?.nodes ?? [];
	const pageInfo = data?.products?.pageInfo;

	const isFetchingMore = networkStatus === NetworkStatus.fetchMore;
	const isInitialLoading =
		networkStatus === NetworkStatus.loading && products.length === 0;
	const isSearching = loading && searchTerm !== "" && !isFetchingMore;

	const loadMore = useCallback(async () => {
		if (isFetchingMore || !pageInfo?.hasNextPage) return;
		try {
			await fetchMore({
				variables: {
					after: pageInfo.endCursor,
					searchTerm,
				},
			});
		} catch (error) {
			showBoundary(error);
		}
	}, [fetchMore, isFetchingMore, pageInfo, showBoundary, searchTerm]);

	return (
		<MultiSelect<Product>
			items={products}
			itemFamily="Products"
			selected={selectedProducts}
			loading={isInitialLoading}
			isSearching={isSearching}
			hasNextPage={pageInfo?.hasNextPage}
			loadingMore={isFetchingMore}
			onCancel={() => onChange([])}
			onChange={(selected) => onChange(selected)}
			onSearch={setSearchTerm}
			onReachEnd={loadMore}
		/>
	);
};
