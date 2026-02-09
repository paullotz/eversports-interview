"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import type { FC } from "react";
import type { FallbackProps } from "react-error-boundary";

export const ErrorFallback: FC<FallbackProps> = ({
	error,
	resetErrorBoundary,
}) => {
	const typedError = error as Error | null;

	return (
		<div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
			<div className="max-w-md space-y-6">
				<div className="flex justify-center">
					<div className="rounded-full bg-destructive/10 p-4">
						<AlertCircle
							className="h-12 w-12 text-destructive"
							aria-hidden="true"
						/>
					</div>
				</div>

				<div>
					<h2 className="text-2xl font-bold mb-2 text-foreground">
						Something went wrong
					</h2>
					<p className="text-muted-foreground">
						{typedError?.message || "An unexpected error occurred"}
					</p>
				</div>

				<div className="flex gap-3 justify-center">
					<button
						type="button"
						onClick={resetErrorBoundary}
						className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
					>
						<RefreshCw className="h-4 w-4" aria-hidden="true" />
						Try Again
					</button>
					<button
						type="button"
						onClick={() => window.location.reload()}
						className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
					>
						Reload Page
					</button>
				</div>

				{typedError?.stack && process.env.NODE_ENV === "development" && (
					<details className="text-left">
						<summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
							Error details (dev only)
						</summary>
						<pre className="mt-2 p-4 text-xs bg-muted rounded-md overflow-auto max-h-48">
							{typedError.stack}
						</pre>
					</details>
				)}
			</div>
		</div>
	);
};
