import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/error-fallback";
import { PurchasedProductsOverview } from "@/components/purchased-products/overview";

export default async function Home() {
	return (
		<div className="container mx-auto py-8 px-4">
			<h1 className="text-2xl font-bold">Purchased Products</h1>

			<div className="py-8" />

			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<PurchasedProductsOverview />
			</ErrorBoundary>
		</div>
	);
}
