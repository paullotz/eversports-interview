import type { Purchase } from "@frontend-interview/types";
import Image from "next/image";
import type { FC } from "react";
import { Card, CardFooter } from "@/components/ui/card";

interface Props {
	purchase: Purchase;
}

export const PurchasedProductCard: FC<Props> = ({ purchase }) => {
	return (
		<Card className="overflow-hidden">
			<div className="relative h-48 w-full">
				<Image
					src={purchase.product.imageUrl}
					alt={purchase.product.name}
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					fill
					className="object-cover"
				/>
			</div>
			<CardFooter className="flex flex-col items-start gap-1 p-4">
				<h3 className="font-semibold">{purchase.product.name}</h3>
				<p className="text-sm text-muted-foreground">
					Purchased by: {purchase.user.firstName} {purchase.user.lastName}
				</p>
			</CardFooter>
		</Card>
	);
};
