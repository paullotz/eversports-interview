import { useCallback, useRef } from "react";

// biome-ignore lint/suspicious/noExplicitAny: Generic callback needs any
export function useDebounceCallback<T extends (...args: any[]) => any>(
	callback: T,
	delay: number,
): [(...args: Parameters<T>) => void, () => void] {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const cancel = useCallback(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	}, []);

	const debouncedCallback = useCallback(
		(...args: Parameters<T>) => {
			cancel();

			timeoutRef.current = setTimeout(() => {
				callback(...args);
			}, delay);
		},
		[callback, delay, cancel],
	);

	return [debouncedCallback, cancel];
}
