"use client";

import type { User } from "@frontend-interview/types";
import { type FC, useMemo } from "react";
import { MultiSelect } from "../multi-select";
import type { MultiSelectItem } from "../types";
import { transformUser } from "./utils";

interface Props {
	users: User[];
	selectedUsers: User[];
	loading?: boolean;
	hasNextPage?: boolean;
	loadingMore?: boolean;
	onChange: (users: User[]) => void;
	onReachEnd?: () => void;
}

export const UserMultiSelect: FC<Props> = ({
	users,
	selectedUsers,
	loading = false,
	hasNextPage,
	loadingMore,
	onChange,
	onReachEnd,
}: Props) => {
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
			loading={loading}
			hasNextPage={hasNextPage}
			loadingMore={loadingMore}
			onCancel={() => onChange([])}
			onChange={(selected) => onChange(selected)}
			onReachEnd={onReachEnd}
		/>
	);
};
