import { cn } from "@/shared/lib/utils";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";

interface Props {
	imageUrl: string;
	name: string;
	price: number;
	onSubmitProduct: VoidFunction;
	className?: string;
	loading: boolean;
}

export const ChooseProductForm: React.FC<Props> = ({
	imageUrl,
	name,
	price,
	onSubmitProduct,
	className,
	loading,
}) => {
	return (
		<div className={cn("flex flex-1", className)}>
			<div className="flex items-center justify-center flex-1 relative w-full">
				<img src={imageUrl} alt={name}
					className="relative left-2 top-2 transition-all z-10 duration-300 size-[350px]"
				/>
			</div>

			<div className="w-[490px] bg-[#F7F7F7] p-7">
				<Title text={name} size="md" className="font-extrabold mb-1" />
				<Button
					className="h-[55px] px-10 text-base rounded-2xl w-full mt-10"
					onClick={onSubmitProduct}
					loading={loading}
				>
					Добавить в корзину за {price} ₽
				</Button>
			</div>
		</div>
	);
};
