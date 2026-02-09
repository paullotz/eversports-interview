"use client";

import type { User } from "@frontend-interview/types";
import type { FC } from "react";
import { USERS_QUERY } from "@/lib/apollo/queries";
import { MultiSelect } from "../multi-select";
import type { MultiSelectItem } from "../types";
import { useMultiSelectData } from "../use-multi-select-data";
import { transformUser } from "./utils";

interface Props {
	selectedUsers: User[];
	onChange: (users: User[]) => void;
}

export const UserMultiSelect: FC<Props> = ({
	selectedUsers,
	onChange,
}: Props) => {
	const data = useMultiSelectData<User & MultiSelectItem>({
		query: USERS_QUERY,
		pageSize: 25,
		transformFn: (users: User[]) => users.map(transformUser),
		itemFamily: "Users",
		value: selectedUsers.map(transformUser),
		onSelectionChange: (items: User[]) => onChange(items),
		onCancel: () => onChange([]),
		onChange: (selected: User[]) => onChange(selected),
	});

	return <MultiSelect<User & MultiSelectItem> data={data} />;
};
