import { useCallback, useEffect, useRef } from "react";

export function useDebounceCallback<T extends (...args: unknown[]) => unknown>(
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

	useEffect(() => {
		return () => {
			cancel();
		};
	}, [cancel]);

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
