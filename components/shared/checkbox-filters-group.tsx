"use client";

import React from "react";
import { FilterCheckbox, FilterCheckboxProps } from "./filter-checkbox";
import { Input, Skeleton } from "../ui";

type Item = Omit<FilterCheckboxProps, "prefix">;

interface Props {
	title: string;
	name: string;
	items: Item[];
	defaultItems?: Item[];
	limit?: number;
	loading?: boolean;
	searchInputPlaceholder?: string;
	onCheck: (value: string) => void,
	className?: string;
	selectedValues: Set<string>
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
	title,
	name,
	items,
	defaultItems,
	limit = 5,
	searchInputPlaceholder = "Поиск...",
	loading,
	className,
	onCheck,
	selectedValues,
}) => {
	const [ showAll, setShowAll ] = React.useState(false);
	const [ searchValue, setSearchValue ] = React.useState("");

	const titleElement = <p className="font-bold mb-3">{title}</p>;

	if (loading) {
		return <div className={className}>
			{titleElement}

			{...Array(limit).fill(0).map((_, i) => (
				<Skeleton key={i} className="h-5 mb-3 rounded-[8px]" />
			))}

			<Skeleton className="w-28 h-5 rounded-[8px]" />
		</div>;
	}

	const displayedItems = showAll ?
		items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase())) :
		(defaultItems || items).slice(0, limit);

	return (
		<div className={className}>
			{titleElement}

			{showAll && (
				<div className="mb-5">
					<Input
						onChange={(e) => setSearchValue(e.target.value)}
						placeholder={searchInputPlaceholder}
						className="bg-gray-50 border-none"
					/>
				</div>
			)}
			<div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
				{displayedItems.map((item, index) => (
					<FilterCheckbox
						key={index}
						text={item.text}
						value={item.value}
						endAdornment={item.endAdornment}
						checked={selectedValues.has(item.value)}
						onCheckedChange={() => onCheck(item.value)}
						prefix={name}
					/>
				))}
			</div>

			{items.length > limit && (
				<div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
					<button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
						{showAll ? "Скрыть" : "+ Показать все"}
					</button>
				</div>
			)}
		</div>
	);
};
