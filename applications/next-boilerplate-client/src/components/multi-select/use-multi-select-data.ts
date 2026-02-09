"use client";

import { type DocumentNode, NetworkStatus, useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import type { MultiSelectItem } from "../../components/multi-select/types";

interface UseMultiSelectDataConfig<T extends MultiSelectItem> {
	query: DocumentNode;
	pageSize: number;
	transformFn?: (data: any) => T[];
	itemFamily: string;
	value: T[];
	onSelectionChange: (items: T[]) => void;
	onCancel?: () => void;
	onChange?: (selected: T[]) => void;
}

export interface MultiSelectData<T> {
	items: T[];
	selected: T[];
	loading: boolean;
	isSearching: boolean;
	hasNextPage: boolean;
	loadingMore: boolean;
	onSearch: (term: string) => void;
	onChange: (selected: T[]) => void;
	onCancel: () => void;
	onReachEnd: () => void;
	itemFamily: string;
}

export const useMultiSelectData = <T extends MultiSelectItem>({
	query,
	pageSize,
	transformFn,
	itemFamily,
	value,
	onSelectionChange,
	onCancel,
	onChange,
}: UseMultiSelectDataConfig<T>): MultiSelectData<T> => {
	const { showBoundary } = useErrorBoundary();
	const [searchTerm, setSearchTerm] = useState("");

	const { data, loading, fetchMore, networkStatus } = useQuery(query, {
		variables: { first: pageSize, searchTerm },
		notifyOnNetworkStatusChange: true,
	});

	const rawItems = data?.products?.nodes ?? data?.users?.nodes ?? [];
	const pageInfo = data?.products?.pageInfo ?? data?.users?.pageInfo;

	const items = transformFn
		? transformFn(rawItems)
		: (rawItems as unknown as T[]);

	const isFetchingMore = networkStatus === NetworkStatus.fetchMore;
	const isInitialLoading =
		networkStatus === NetworkStatus.loading && items.length === 0;
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

	const handleSearch = useCallback((term: string) => {
		setSearchTerm(term);
	}, []);

	const handleChange = useCallback(
		(selected: T[]) => {
			onChange?.(selected);
		},
		[onChange],
	);

	const handleCancel = useCallback(() => {
		onCancel?.();
		onSelectionChange([]);
	}, [onCancel, onSelectionChange]);

	return {
		items,
		selected: value,
		loading: isInitialLoading,
		isSearching,
		hasNextPage: pageInfo?.hasNextPage ?? false,
		loadingMore: isFetchingMore,
		onSearch: handleSearch,
		onChange: handleChange,
		onCancel: handleCancel,
		onReachEnd: loadMore,
		itemFamily,
	};
};
