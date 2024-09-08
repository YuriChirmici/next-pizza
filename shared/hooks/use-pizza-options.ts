import { useEffect, useState } from "react";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { Variant } from "../components/shared/group-variants";
import { ProductItem } from "@prisma/client";
import { getAvailablePizzaSizes } from "../lib/get-available-pizza-sizes";
import { useSet } from "react-use";

interface Props {
	items: ProductItem[];
}

interface ReturnProps {
	size: PizzaSize;
	setSize: (size: PizzaSize) => void;
	type: PizzaType;
	setType: (type: PizzaType) => void;
	availablePizzaSizes: Variant[];
	selectedIngredients: Set<number>;
	toggleIngredient: (id: number) => void;
	currentItemId?: number;
}

export const usePizzaOptions = ({ items }: Props): ReturnProps => {
	const [ selectedIngredients, { toggle: toggleIngredient } ] = useSet(new Set<number>());

	const [ size, setSize ] = useState<PizzaSize>(20);
	const [ type, setType ] = useState<PizzaType>(1);

	const availablePizzaSizes = getAvailablePizzaSizes({ items, type });

	const currentItemId = items.find((item) => item.pizzaType === type && item.size === size)?.id;

	useEffect(() => {
		const currentSizeAvailable = !!availablePizzaSizes.find((item) => Number(item.value) === size && !item.disabled);
		if (currentSizeAvailable) {
			return;
		}

		const availableSize = availablePizzaSizes.find((item) => !item.disabled);
		if (availableSize) {
			setSize(Number(availableSize.value) as PizzaSize);
		}
	}, [ type ]);

	return {
		size, setSize,
		type, setType,
		selectedIngredients, toggleIngredient,
		availablePizzaSizes,
		currentItemId
	};
};
