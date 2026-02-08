"use client";

import type { Product } from "@frontend-interview/types";
import type { FC } from "react";
import { MultiSelect } from "../multi-select";

interface Props {
	products: Product[];
	selectedProducts: Product[];
	loading?: boolean;
	hasNextPage?: boolean;
	loadingMore?: boolean;
	onChange: (products: Product[]) => void;
	onReachEnd?: () => void;
}

export const ProductMultiSelect: FC<Props> = ({
	products,
	selectedProducts,
	loading = false,
	hasNextPage,
	loadingMore,
	onChange,
	onReachEnd,
}: Props) => {
	return (
		<MultiSelect<Product>
			items={products}
			itemFamily="Products"
			selected={selectedProducts}
			loading={loading}
			hasNextPage={hasNextPage}
			loadingMore={loadingMore}
			onCancel={() => onChange([])}
			onChange={(selected) => onChange(selected)}
			onReachEnd={onReachEnd}
		/>
	);
};
