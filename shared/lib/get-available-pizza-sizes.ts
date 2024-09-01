import { ProductItem } from "@prisma/client";
import { pizzaSizes, PizzaType } from "../constants/pizza";
import { Variant } from "../components/shared/group-variants";

interface Props {
	items: ProductItem[]
	type: PizzaType;
}

export const getAvailablePizzaSizes = ({ items, type }: Props): Variant[] => {
	const filteredPizzasByType = items.filter((item) => item.pizzaType === type);
	const availablePizzaSizes = pizzaSizes.map((item) => ({
		...item,
		disabled: !filteredPizzasByType.some((pizza) => pizza.size == Number(item.value))
	}));

	return availablePizzaSizes;
};
