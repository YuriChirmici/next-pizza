import { cn } from "@/shared/lib/utils";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { PizzaImage } from "./pizza-image";

interface Props {
	imageUrl: string;
	name: string;
	ingredients: any;
	items: any;
	onClickAdd?: VoidFunction
	className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
	imageUrl,
	name,
	ingredients,
	items,
	onClickAdd,
	className,
}) => {
	const textDetails = "30 см, традиционное тесто 30";
	const totalPrice = "350p";
	const size = 30;

	return (
		<div className={cn("flex flex-1", className)}>
			<PizzaImage src={imageUrl} name={name} size={size} />

			<div className="w-[490px] bg-[#F7F7F7] p-7">
				<Title text={name} size="md" className="font-extrabold mb-1" />
				<p className="text-gray-400"> {textDetails} </p>
				<Button className="h-[55px] px-10 text-base rounded-2xl w-full mt-10">
					Добавить в корзину за {totalPrice}
				</Button>
			</div>
		</div>
	);
};
