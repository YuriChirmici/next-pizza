// import { calcCartItemTotalAmount } from "./calc-cart-item-total-amount";
import { Cart } from "@prisma/client";
import { CartDTO } from "../services/dto/cart.dto";
import { calcCartItemTotalAmount } from "./calc-cart-item-total-amount";
import { PizzaSize, PizzaType } from "../constants/pizza";

export type CartStateItem = {
	id: number;
	quantity: number;
	name: string;
	imageUrl: string;
	price: number;
	pizzaSize?: PizzaSize;
	pizzaType?: PizzaType;
	ingredients: Array<{ name: string; price: number }>;
};

type ReturnProps = {
	items: CartStateItem[];
	totalAmount: number;
};

export const getCartDetails = (data: CartDTO): ReturnProps => {
	const items = data.items.map((item) => ({
		id: item.id,
		quantity: item.quantity,
		name: item.productItem.product.name,
		imageUrl: item.productItem.product.imageUrl,
		price: calcCartItemTotalAmount(item),
		pizzaSize: item.productItem.size as PizzaSize,
		pizzaType: item.productItem.pizzaType as PizzaType,
		ingredients: item.ingredients.map((ingredient) => ({
			name: ingredient.name,
			price: ingredient.price,
		})),
	}));

	return {
		items,
		totalAmount: data.totalAmount || 0
	};
};
