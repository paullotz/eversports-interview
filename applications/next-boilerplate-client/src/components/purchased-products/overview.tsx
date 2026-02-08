"use client";

import { NetworkStatus, useQuery } from "@apollo/client";
import type { Product, User } from "@frontend-interview/types";
import { useCallback, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { PRODUCTS_QUERY, USERS_QUERY } from "@/lib/apollo/queries";
import { ProductMultiSelect, UserMultiSelect } from "../multi-select";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { PurchasedProductList } from "./list";

export const PurchasedProductsOverview = () => {
	const { showBoundary } = useErrorBoundary();

	const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
	const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

	const {
		data: productsData,
		fetchMore: fetchMoreProducts,
		networkStatus: productsNetworkStatus,
	} = useQuery(PRODUCTS_QUERY, {
		variables: { first: 50 },
		notifyOnNetworkStatusChange: true,
	});
	const products = productsData?.products?.nodes ?? [];
	const productsPageInfo = productsData?.products?.pageInfo;

	const {
		data: usersData,
		fetchMore: fetchMoreUsers,
		networkStatus: usersNetworkStatus,
	} = useQuery(USERS_QUERY, {
		variables: { first: 25 },
		notifyOnNetworkStatusChange: true,
	});
	const users = usersData?.users?.nodes ?? [];
	const usersPageInfo = usersData?.users?.pageInfo;

	const isFetchingMoreProducts =
		productsNetworkStatus === NetworkStatus.fetchMore;
	const isInitialLoadingProducts =
		productsNetworkStatus === NetworkStatus.loading;

	const loadMoreProducts = useCallback(async () => {
		if (isFetchingMoreProducts || !productsPageInfo?.hasNextPage) return;
		try {
			await fetchMoreProducts({
				variables: {
					after: productsPageInfo.endCursor,
				},
			});
		} catch (error) {
			showBoundary(error);
		}
	}, [
		fetchMoreProducts,
		isFetchingMoreProducts,
		productsPageInfo,
		showBoundary,
	]);

	const isFetchingMoreUsers = usersNetworkStatus === NetworkStatus.fetchMore;
	const isInitialLoadingUsers = usersNetworkStatus === NetworkStatus.loading;

	const loadMoreUsers = useCallback(async () => {
		if (isFetchingMoreUsers || !usersPageInfo?.hasNextPage) return;
		try {
			await fetchMoreUsers({
				variables: {
					after: usersPageInfo.endCursor,
				},
			});
		} catch (error) {
			showBoundary(error);
		}
	}, [fetchMoreUsers, isFetchingMoreUsers, usersPageInfo, showBoundary]);

	const clearFilters = () => {
		setSelectedProducts([]);
		setSelectedUsers([]);
	};

	return (
		<div>
			<div className="flex flex-col sm:flex-row gap-2 items-end">
				<div className="flex flex-col gap-2 w-full sm:w-2/5">
					<Label>Products</Label>
					<ProductMultiSelect
						products={products}
						selectedProducts={selectedProducts}
						hasNextPage={productsPageInfo?.hasNextPage}
						loading={isInitialLoadingProducts}
						loadingMore={isFetchingMoreProducts}
						onChange={setSelectedProducts}
						onReachEnd={loadMoreProducts}
					/>
				</div>

				<div className="flex flex-col gap-2 w-full sm:w-2/5">
					<Label>Users</Label>
					<UserMultiSelect
						users={users}
						selectedUsers={selectedUsers}
						hasNextPage={usersPageInfo?.hasNextPage}
						loading={isInitialLoadingUsers}
						loadingMore={isFetchingMoreUsers}
						onChange={setSelectedUsers}
						onReachEnd={loadMoreUsers}
					/>
				</div>
				<Button
					className="w-full sm:w-1/5"
					variant="outline"
					onClick={clearFilters}
				>
					Clear filters
				</Button>
			</div>

			<Separator className="w-full my-4" />

			<PurchasedProductList
				selectedProducts={selectedProducts}
				selectedUsers={selectedUsers}
				onClearFilters={clearFilters}
			/>
		</div>
	);
};
