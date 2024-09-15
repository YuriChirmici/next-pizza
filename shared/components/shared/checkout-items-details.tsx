import { cn } from "@/shared/lib/utils";
import React from "react";

interface Props {
	icon?: React.ReactNode;
	text?: React.ReactNode;
	value?: React.ReactNode;
	className?: string;
}

export const CheckoutItemsDetails: React.FC<Props> = ({ className, icon, text, value }) => {
	return (
		<div className={cn("flex my-4", className)}>
			<span className="flex flex-1 text-lg text-neutral-500">
				<div className="flex items-center">
					{icon ? <span className="mr-2 text-gray-400">{icon}</span> : null}
					<span className="leading-[1]"> {text} </span>
				</div>

				<div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
				<span className="font-bold text-lg">{value}</span>
			</span>
		</div>
	);
};
