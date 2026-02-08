"use client";

import { useQuery } from "@apollo/client";
import type { Product, User } from "@frontend-interview/types";
import { useState } from "react";
import { PRODUCTS_QUERY, USERS_QUERY } from "@/lib/apollo/queries";
import { ProductMultiSelect, UserMultiSelect } from "../multi-select";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { PurchasedProductList } from "./list";

export const PurchasedProductsOverview = () => {
	const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
	const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

	const { data: productsData, loading: isProductsLoading } = useQuery(
		PRODUCTS_QUERY,
		{ variables: { first: 300 } },
	);
	const products = productsData?.products?.nodes ?? [];

	const { data: usersData, loading: isUsersLoading } = useQuery(USERS_QUERY, {
		variables: { first: 100 },
	});
	const users = usersData?.users?.nodes ?? [];

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
						onChange={setSelectedProducts}
						products={products}
						selectedProducts={selectedProducts}
						loading={isProductsLoading}
					/>
				</div>

				<div className="flex flex-col gap-2 w-full sm:w-2/5">
					<Label>Users</Label>
					<UserMultiSelect
						onChange={setSelectedUsers}
						users={users}
						selectedUsers={selectedUsers}
						loading={isUsersLoading}
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
