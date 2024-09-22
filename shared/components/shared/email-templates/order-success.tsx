import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import React from "react";

interface Props {
	orderId: number;
	items: CartItemDTO[];
	totalAmount: number;
}

export const OrderSuccessTemplate: React.FC<Props> = ({ orderId, items, totalAmount }) => {
	return (
		<div>
			<h1> Спасибо за покупку!</h1>

			<p>Ваш заказ #{orderId} на сумму <b> {totalAmount} ₽</b> оплачен. Список товаров: </p>

			<br />

			<ul>
				{items.map((item) => (
					<li key={item.id}>
						{item.productItem.product.name} - {item.quantity} шт. x {item.productItem.price} ₽.
					</li>
				))}
			</ul>
		</div>
	);
};
