"use client";

import type { Product, User } from "@frontend-interview/types";
import { useState } from "react";
import { ProductMultiSelect, UserMultiSelect } from "../multi-select";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { PurchasedProductList } from "./list";

export const PurchasedProductsOverview = () => {
	const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
	const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

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
						selectedProducts={selectedProducts}
						onChange={setSelectedProducts}
					/>
				</div>

				<div className="flex flex-col gap-2 w-full sm:w-2/5">
					<Label>Users</Label>
					<UserMultiSelect
						selectedUsers={selectedUsers}
						onChange={setSelectedUsers}
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
