"use client";

import { useCallback, useEffect, useRef } from "react";

export function useDebounceCallback<Args extends unknown[]>(
	callback: (...args: Args) => unknown,
	delay: number,
): [(...args: Args) => void, () => void] {
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
		(...args: Args) => {
			cancel();

			timeoutRef.current = setTimeout(() => {
				callback(...args);
			}, delay);
		},
		[callback, delay, cancel],
	);

	return [debouncedCallback, cancel];
}
