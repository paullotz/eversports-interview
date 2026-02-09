import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PurchasedProductListEmpty } from "../components/purchased-products/list/empty";

describe("PurchasedProductListEmpty", () => {
	it("renders correctly", () => {
		const onClearFilters = vi.fn();
		render(<PurchasedProductListEmpty onClearFilters={onClearFilters} />);

		expect(screen.getByText("No purchases found")).toBeDefined();
		expect(
			screen.getByText(
				"Try adjusting your filters or clearing them to see more results.",
			),
		).toBeDefined();
		expect(
			screen.getByRole("button", { name: /clear filters/i }),
		).toBeDefined();
	});

	it("calls onClearFilters when button is clicked", () => {
		const onClearFilters = vi.fn();
		render(<PurchasedProductListEmpty onClearFilters={onClearFilters} />);

		const button = screen.getByRole("button", { name: /clear filters/i });
		fireEvent.click(button);

		expect(onClearFilters).toHaveBeenCalledTimes(1);
	});
});
