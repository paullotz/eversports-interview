import type { FieldMergeFunction } from "@apollo/client";

export const paginationMerge: FieldMergeFunction = (existing, incoming) => {
	if (!existing) {
		return incoming;
	}

	if (!incoming) {
		return existing;
	}

	return {
		...incoming,
		nodes: [...(existing.nodes || []), ...(incoming.nodes || [])],
	};
};
