import React from "react";
import { CountIconButton } from "./count-icon-button";
import { cn } from "@/shared/lib/utils";

export interface CountButtonProps {
	value?: number;
	size?: "sm" | "lg";
	className?: string;
	onClick?: (type: "plus" | "minus") => void;
	disabled?: boolean;
}

export const CountButton: React.FC<CountButtonProps> = ({
	className,
	onClick,
	value = 1,
	size = "sm",
	disabled
}) => {
	return (
		<div className={cn("inline-flex items-center justify-between gap-3", className)}>
			<CountIconButton
				disabled={value === 1 || disabled}
				size={size}
				type="minus"
				onClick={() => onClick?.("minus")}
			/>

			<b className={size === "sm" ? "text-sm" : "text-md"}>{value}</b>

			<CountIconButton
				size={size}
				type="plus"
				disabled={disabled}
				onClick={() => onClick?.("plus")}
			/>
		</div>
	);
};
