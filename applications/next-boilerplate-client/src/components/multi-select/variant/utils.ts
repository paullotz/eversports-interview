import type { User } from "@frontend-interview/types";
import type { MultiSelectItem } from "../types";

export const transformUser = (user: User): User & MultiSelectItem => ({
	...user,
	name: `${user.firstName} ${user.lastName}`,
});
