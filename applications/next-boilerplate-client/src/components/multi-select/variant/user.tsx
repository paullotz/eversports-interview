"use client";

import { NetworkStatus, useQuery } from "@apollo/client";
import type { User } from "@frontend-interview/types";
import { type FC, useCallback, useMemo } from "react";
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

	const { data, fetchMore, networkStatus } = useQuery(USERS_QUERY, {
		variables: { first: 25 },
		notifyOnNetworkStatusChange: true,
	});

	const users = data?.users?.nodes ?? [];
	const pageInfo = data?.users?.pageInfo;

	const isFetchingMore = networkStatus === NetworkStatus.fetchMore;
	const isInitialLoading = networkStatus === NetworkStatus.loading;

	const loadMore = useCallback(async () => {
		if (isFetchingMore || !pageInfo?.hasNextPage) return;
		try {
			await fetchMore({
				variables: {
					after: pageInfo.endCursor,
				},
			});
		} catch (error) {
			showBoundary(error);
		}
	}, [fetchMore, isFetchingMore, pageInfo, showBoundary]);

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
			hasNextPage={pageInfo?.hasNextPage}
			loadingMore={isFetchingMore}
			onCancel={() => onChange([])}
			onChange={(selected) => onChange(selected)}
			onReachEnd={loadMore}
		/>
	);
};
