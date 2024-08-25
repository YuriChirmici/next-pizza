import React from "react";
import { Checkbox } from "../ui/checkbox";

export interface FilterCheckboxProps {
	text: string;
	value: string;
	endAdornment?: React.ReactNode;
	onCheckedChange?: (checked: boolean) => void;
	checked?: boolean;
	prefix: string;
}

export const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
	text,
	value,
	endAdornment,
	onCheckedChange,
	checked,
	prefix
}) => {
	const elementId = `checkbox-${prefix}-${value.toString()}`;
	return (
		<div className="flex items-center space-x-2">
			<Checkbox
				onCheckedChange={onCheckedChange}
				checked={checked}
				value={value}
				className="rounded-[8px] w-6 h-6"
				id={elementId}
			/>
			<label htmlFor={elementId} className="leading-none cursor-pointer flex-1">
				{text}
			</label>
			{endAdornment}
		</div>
	);
};
