import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { INTERSECTION_THRESHOLD } from "../../lib/constants";

export const Sentinel = ({
	onReachEnd,
	loadingMore,
}: {
	onReachEnd?: () => void;
	loadingMore?: boolean;
}) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const node = ref.current;
		if (!node || loadingMore) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					onReachEnd?.();
				}
			},
			{ threshold: INTERSECTION_THRESHOLD },
		);

		observer.observe(node);

		return () => observer.disconnect();
	}, [onReachEnd, loadingMore]);

	return (
		<div ref={ref} className="h-4 w-full flex items-center justify-center p-2">
			{loadingMore && (
				<Loader2 className="h-4 w-4 m-2 animate-spin text-muted-foreground" />
			)}
		</div>
	);
};
