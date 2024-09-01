"use client";

import { cn } from "@/shared/lib/utils";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { PizzaImage } from "./pizza-image";
import { GroupVariants } from "./group-variants";
import { mapPizzaType, PizzaSize, PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import { Ingredient, ProductItem } from "@prisma/client";
import { IngredientItem } from "./ingredient-item";
import { calcTotalPizzaPrice } from "@/shared/lib/calc-total-pizza-price";
import { usePizzaOptions } from "@/shared/hooks//use-pizza-options";

interface Props {
	imageUrl: string;
	name: string;
	ingredients: Ingredient[];
	items: ProductItem[];
	onClickAddCart?: VoidFunction;
	className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
	imageUrl,
	name,
	ingredients,
	items,
	onClickAddCart,
	className,
}) => {

	const {
		size, setSize,
		type, setType,
		selectedIngredients, toggleIngredient,
		availablePizzaSizes,
	} = usePizzaOptions({ items });

	const totalPrice = calcTotalPizzaPrice({ items, type, size, ingredients, selectedIngredients });
	const textDetails = `${size} см, ${mapPizzaType[type]} тесто`;

	const handleClick = () => {
		onClickAddCart?.();
		console.log({ size, type, ingredients: selectedIngredients });
	};

	return (
		<div className={cn("flex flex-1", className)}>
			<PizzaImage src={imageUrl} name={name} size={size} />

			<div className="w-[490px] bg-[#F7F7F7] p-7">
				<Title text={name} size="md" className="font-extrabold mb-1" />
				<p className="text-gray-400"> {textDetails} </p>

				<div className="flex flex-col gap-4 mt-4">
					<GroupVariants
						items={availablePizzaSizes}
						value={String(size)}
						onClick={(value) => setSize(Number(value) as PizzaSize)}
					/>
					<GroupVariants
						items={pizzaTypes}
						value={String(type)}
						onClick={(value) => setType(Number(value) as PizzaType)}
					/>
				</div>

				<div className="bg-gray-50 p-5 rounded-md h-[320px] overflow-auto scrollbar mt-5">
					<div className="grid grid-cols-3 gap-3">
						{ingredients.map((ingredient) => (
							<IngredientItem
								key={ingredient.id}
								imageUrl={ingredient.imageUrl}
								price={ingredient.price}
								name={ingredient.name}
								active={selectedIngredients.has(ingredient.id)}
								onClick={() => toggleIngredient(ingredient.id)}
							/>
						))}
					</div>
				</div>

				<Button className="h-[55px] px-10 text-base rounded-2xl w-full mt-10" onClick={handleClick}>
					Добавить в корзину за {totalPrice} ₽
				</Button>
			</div>
		</div>
	);
};
