import { cn } from "@/shared/lib/utils";
import React from "react";

interface Props {
	className?: string;
	src: string;
	name: string;
	size: 20 | 30 | 40;
}

const sizeToPx = {
	20: 200,
	30: 300,
	40: 400,
};

export const PizzaImage: React.FC<Props> = ({ className, src, name, size }) => {
	const sizePx = sizeToPx[size];
	const circleBaseClass = "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 rounded-full transition-all";

	return (
		<div className={cn("flex items-center justify-center flex-1 relative w-full", className)}>
			<img
				src={src}
				alt={name || "product"}
				className={cn(
					"relative left-2 top-2 transition-all z-10 duration-300",
					` w-[${sizePx}px] h-[${sizePx}px]`
				)}
				style={{ width: `${sizePx}px`, height: `${sizePx}px` }}
			/>

			<div className={cn(circleBaseClass, "border-dashed border-gray-200 w-[270px] h-[270px]")} />
			<div className={cn(circleBaseClass, "border-dotted border-gray-200 w-[360px] h-[360px]")} />
		</div>
	);
};
