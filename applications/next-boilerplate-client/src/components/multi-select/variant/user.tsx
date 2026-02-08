"use client";

import { NetworkStatus, useQuery } from "@apollo/client";
import type { User } from "@frontend-interview/types";
import { type FC, useCallback, useMemo, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { USERS_QUERY } from "@/lib/apollo/queries";
import { MultiSelect } from "../multi-select";
import type { MultiSelectItem } from "../types";
import { transformUser } from "./utils";

interface Props {
	selectedUsers: User[];
	onChange: (users: User[]) => void;
}

export const UserMultiSelect: FC<Props> = ({
	selectedUsers,
	onChange,
}: Props) => {
	const { showBoundary } = useErrorBoundary();
	const [searchTerm, setSearchTerm] = useState("");

	const { data, loading, fetchMore, networkStatus } = useQuery(USERS_QUERY, {
		variables: { first: 25, searchTerm },
		notifyOnNetworkStatusChange: true,
	});

	const users = data?.users?.nodes ?? [];
	const pageInfo = data?.users?.pageInfo;

	const isFetchingMore = networkStatus === NetworkStatus.fetchMore;
	const isInitialLoading =
		networkStatus === NetworkStatus.loading && users.length === 0;
	const isSearching = loading && searchTerm !== "" && !isFetchingMore;

	const loadMore = useCallback(async () => {
		if (isFetchingMore || !pageInfo?.hasNextPage) return;
		try {
			await fetchMore({
				variables: {
					after: pageInfo.endCursor,
					searchTerm,
				},
			});
		} catch (error) {
			showBoundary(error);
		}
	}, [fetchMore, isFetchingMore, pageInfo, showBoundary, searchTerm]);

	const transformedUsers = useMemo(() => users.map(transformUser), [users]);
	const transformedSelected = useMemo(
		() => selectedUsers.map(transformUser),
		[selectedUsers],
	);

	return (
		<MultiSelect<User & MultiSelectItem>
			items={transformedUsers}
			itemFamily="Users"
			selected={transformedSelected}
			loading={isInitialLoading}
			isSearching={isSearching}
			hasNextPage={pageInfo?.hasNextPage}
			loadingMore={isFetchingMore}
			onCancel={() => onChange([])}
			onChange={(selected) => onChange(selected)}
			onSearch={setSearchTerm}
			onReachEnd={loadMore}
		/>
	);
};
