"use client";

import type { Product } from "@frontend-interview/types";
import type { FC } from "react";
import { PRODUCTS_QUERY } from "@/lib/apollo/queries";
import { MultiSelect } from "../multi-select";
import { useMultiSelectData } from "../use-multi-select-data";

interface Props {
	selectedProducts: Product[];
	onChange: (products: Product[]) => void;
}

export const ProductMultiSelect: FC<Props> = ({
	selectedProducts,
	onChange,
}: Props) => {
	const data = useMultiSelectData<Product>({
		query: PRODUCTS_QUERY,
		pageSize: 50,
		itemFamily: "Products",
		value: selectedProducts,
		onSelectionChange: onChange,
		onCancel: () => onChange([]),
		onChange: (selected) => onChange(selected),
	});

	return <MultiSelect<Product> data={data} />;
};
