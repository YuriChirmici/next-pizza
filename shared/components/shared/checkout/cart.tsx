import React from "react";
import { WhiteBlock } from "../white-block";
import { CheckoutItem } from "../checkout-item";
import { getCartItemDetails } from "@/shared/lib/get-cart-item-details";
import { useCart } from "@/shared/hooks/use-cart";
import { ItemSkeleton } from "./item-skeleton";

interface Props {
	className?: string;
}

export const CheckoutCart: React.FC<Props> = ({ className }) => {
	const { items, loading, removeCartItem, updateItemQuantity } = useCart();

	const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
		const value = type === "plus" ? quantity + 1 : quantity - 1;
		updateItemQuantity(id, value);
	};

	return (
		<WhiteBlock className={className} title="1. Корзина">
			<div className="flex flex-col gap-5">
				{loading ? (
					[ ...Array(3) ].map((_, index) => <ItemSkeleton key={index} className="h-16" />)
				) : (
					items.map((item) => (
						<CheckoutItem
							key={item.id}
							id={item.id}
							name={item.name}
							price={item.price}
							imageUrl={item.imageUrl}
							details={getCartItemDetails({ pizzaSize: item.pizzaSize, pizzaType: item.pizzaType, ingredients: item.ingredients })}
							quantity={item.quantity}
							disabled={item.disabled}
							loading={loading}
							onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
							onClickRemove={() => removeCartItem(item.id)}
						/>
					))
				)
				}
			</div>
		</WhiteBlock>
	);
};
