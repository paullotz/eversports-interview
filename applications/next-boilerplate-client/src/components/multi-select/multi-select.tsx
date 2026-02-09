"use client";

import { Loader2, Search } from "lucide-react";
import type { ChangeEvent } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounceCallback } from "@/lib/hooks/use-debounce-callback";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectTrigger,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { ItemRow } from "./item-row";
import { Sentinel } from "./sentinel";
import type { MultiSelectItem } from "./types";
import type { MultiSelectData } from "./use-multi-select-data";

interface Props<T extends MultiSelectItem> {
	data: MultiSelectData<T>;
}

export const MultiSelect = <T extends MultiSelectItem>({ data }: Props<T>) => {
	const [draftSelected, setDraftSelected] = useState<T[]>(data.selected);
	const [open, setOpen] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [isDebouncing, setIsDebouncing] = useState<boolean>(false);

	useEffect(() => {
		if (open) {
			setDraftSelected(data.selected);
		}
	}, [data.selected, open]);

	const filteredItems = useMemo(() => {
		if (!searchTerm) {
			return data.items;
		}
		return data.items.filter((item: T) =>
			item.name.toLowerCase().includes(searchTerm.toLowerCase()),
		);
	}, [data.items, searchTerm]);

	const [debouncedSearch, cancelSearch] = useDebounceCallback(
		(term: string) => {
			data.onSearch(term);
			setIsDebouncing(false);
		},
		300,
	);

	const changeSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
		setIsDebouncing(true);
		debouncedSearch(e.target.value);
	};

	const toggleItem = useCallback(
		(id: string) => {
			setDraftSelected((prev) => {
				const isSelected = prev.some((item: T) => item.id === id);

				if (isSelected) {
					return prev.filter((item: T) => item.id !== id);
				}

				const item = data.items.find((item: T) => item.id === id);

				if (!item) {
					return prev;
				}

				return [...prev, item];
			});
		},
		[data.items],
	);

	const selectAllItems = () => {
		const allSelected =
			data.items.length > 0 && draftSelected.length === data.items.length;
		if (allSelected) {
			setDraftSelected([]);
		} else {
			setDraftSelected(data.items);
		}
	};

	const isAllSelected =
		data.items.length > 0 && draftSelected.length === data.items.length;

	const toggleSelect = (isOpen: boolean) => {
		if (data.loading) {
			return;
		}

		setOpen(isOpen);

		if (isOpen) {
			setDraftSelected(data.selected);
			cancelSearch();
			setIsDebouncing(false);
			setSearchTerm("");
			data.onSearch("");
		}
	};

	const resetSearch = () => {
		cancelSearch();
		setIsDebouncing(false);
		setSearchTerm("");
		data.onSearch("");
	};

	const applySelection = () => {
		setOpen(false);
		data.onChange(draftSelected);
	};

	const cancelSelection = () => {
		setOpen(false);
		cancelSearch();
		setIsDebouncing(false);
		setSearchTerm("");
		data.onSearch("");
		data.onCancel();
	};

	const hasSelection = data.selected.length > 0;
	const triggerLabel = hasSelection
		? `${data.selected.length} ${data.itemFamily} selected`
		: `Select ${data.itemFamily}`;

	return (
		<Select open={open} onOpenChange={toggleSelect}>
			<SelectTrigger
				disabled={data.loading}
				aria-expanded={open}
				aria-busy={data.loading}
				className={cn(
					"border-input focus:ring-0 focus:ring-offset-0",
					open && "border-eversports bg-eversports/10",
				)}
			>
				<span className={cn(open && "text-eversports-foreground")}>
					{data.loading ? (
						<span className="flex items-center gap-2 text-muted-foreground">
							<Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
							<span>Loading {data.itemFamily.toLowerCase()}...</span>
						</span>
					) : (
						triggerLabel
					)}
				</span>
			</SelectTrigger>

			<SelectContent role="listbox" aria-label={`${data.itemFamily} selection`}>
				<div className="flex flex-row items-center px-3">
					<Search className="h-4 w-4" aria-hidden="true" />
					<Input
						className="w-full border-none shadow-none focus-visible:ring-0 text-sm"
						placeholder="Search"
						value={searchTerm}
						onChange={changeSearchTerm}
						aria-label={`Search ${data.itemFamily.toLowerCase()}`}
					/>
				</div>

				<Separator className="mb-3" />

				<SelectGroup>
					<div className="flex flex-row items-center gap-2 px-3">
						<Checkbox
							id="select-all"
							checked={isAllSelected}
							onCheckedChange={selectAllItems}
							aria-label="Select all items"
						/>
						<Label htmlFor="select-all">Select All</Label>
					</div>

					<Separator className="my-3" />

					<fieldset
						className="flex flex-col gap-y-5 px-3 overflow-y-auto max-h-60"
						aria-label="Available items"
					>
						{data.isSearching || isDebouncing ? (
							<div className="flex items-center justify-center py-4">
								<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
							</div>
						) : (
							<>
								{(searchTerm ? filteredItems : data.items).map((item: T) => (
									<ItemRow
										key={item.id}
										item={item}
										draftSelected={draftSelected}
										toggleItem={toggleItem}
									/>
								))}
								{data.hasNextPage && (
									<Sentinel
										onReachEnd={data.onReachEnd}
										loadingMore={data.loadingMore}
									/>
								)}
							</>
						)}
					</fieldset>

					{searchTerm &&
						!data.isSearching &&
						!isDebouncing &&
						filteredItems.length === 0 && (
							<div className="flex flex-col gap-2 items-center justify-start">
								<div className="px-3 text-sm text-muted-foreground">
									No {data.itemFamily.toLowerCase()} found.
								</div>
								<Button size="sm" variant="ghost" onClick={resetSearch}>
									Reset search
								</Button>
							</div>
						)}
				</SelectGroup>

				<Separator className="my-2" />

				<div className="flex justify-between px-3 mb-1">
					<Button variant="ghost" onClick={cancelSelection}>
						Cancel
					</Button>
					<Button onClick={applySelection}>Apply</Button>
				</div>
			</SelectContent>
		</Select>
	);
};
