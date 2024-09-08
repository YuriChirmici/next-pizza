import { Ingredient, ProductItem } from "@prisma/client";

type Item = {
	productItem: ProductItem;
	ingredients: Ingredient[];
	quantity: number;
};

export const calcCartItemTotalAmount = (item: Item): number => {
	const ingredientsPrice = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
	return (item.productItem.price + ingredientsPrice) * item.quantity;
};
