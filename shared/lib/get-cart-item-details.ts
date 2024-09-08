import { Ingredient } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";
import { CartStateItem } from "./get-cart-details";

interface Props {
	pizzaType: PizzaType,
	pizzaSize: PizzaSize,
	ingredients: CartStateItem["ingredients"],
}

export const getCartItemDetails = ({
	pizzaType,
	pizzaSize,
	ingredients,
}: Props): string => {
	const details = [];

	if (pizzaSize && pizzaType) {
		const typeName = mapPizzaType[pizzaType];
		details.push(`${typeName} ${pizzaSize} см`);
	}

	if (ingredients) {
		details.push(...ingredients.map((ingredient) => ingredient.name));
	}

	return details.join(", ");
};
