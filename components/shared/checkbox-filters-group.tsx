"use client";

import React from "react";
import { FilterCheckbox, FilterCheckboxProps } from "./filter-checkbox";
import { Input } from "../ui";

type Item = FilterCheckboxProps;

interface Props {
	title: string;
	items: Item[];
	defaultItems: Item[];
	limit?: number;
	searchInputPlaceholder?: string;
	onChange?: (values: string[]) => void;
	defaultValue?: string[];
	className?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
	title,
	items,
	defaultItems,
	limit = 5,
	searchInputPlaceholder = "Поиск...",
	className,
	onChange,
	defaultValue,
}) => {
	const [ showAll, setShowAll ] = React.useState(false);
	const [ searchValue, setSearchValue ] = React.useState("");

	const displayedItems = showAll ?
		items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase())) :
		defaultItems.slice(0, limit);

	return (
		<div className={className}>
			<p className="font-bold mb-3"></p>

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
						checked={false}
						onCheckedChange={(ids) => console.log(ids)}
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
