import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

interface Props {
	items: ProductItem[];
	type: PizzaType;
	size: PizzaSize;
	ingredients: Ingredient[];
	selectedIngredients: Set<number>;
}

export const calcTotalPizzaPrice = ({ items, type, size, ingredients, selectedIngredients }: Props): number => {
	const pizzaPrice = items.find(item => item.pizzaType == type && item.size == size)?.price || 0;

	// TODO: change not found item calculation
	const totalIngredientsPrice = ingredients
		.filter(({ id }) => selectedIngredients.has(id))
		.reduce((sum, { price }) => sum + price, 0);

	const totalPrice = pizzaPrice + totalIngredientsPrice;

	return totalPrice;
};
