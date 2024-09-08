"use client";

import React, { useEffect } from "react";

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetFooter,
	SheetTrigger,
} from "@/shared/components/ui/sheet";
import Link from "next/link";
import { Button } from "../ui";
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib/get-cart-item-details";
import { useCartStore } from "@/shared/store/cart";

interface Props {
	className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
	const [ items, totalAmount, fetchCartItems, updateItemQuantity, removeCartItem, loading ] = useCartStore((state) => [
		state.items,
		state.totalAmount,
		state.fetchCartItems,
		state.updateItemQuantity,
		state.removeCartItem,
		state.loading
	]);

	useEffect(() => {
		fetchCartItems();
	}, []);

	const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
		const value = type === "plus" ? quantity + 1 : quantity - 1;
		updateItemQuantity(id, value);
	};

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
				<SheetHeader>
					<SheetTitle>
						В корзине <span className="font-bold">{items.length} товар(ов)</span>
					</SheetTitle>
				</SheetHeader>

				<div className="-mx-6 mt-5 overflow-auto flex-1">
					{items.map((item) => (
						<CartDrawerItem
							key={item.id}
							className="mb-2"
							id={item.id}
							imageUrl={item.imageUrl}
							details={item.pizzaSize && item.pizzaType
								? getCartItemDetails({ pizzaSize: item.pizzaSize, pizzaType: item.pizzaType, ingredients: item.ingredients })
								: ""
							}
							name={item.name}
							price={item.price}
							quantity={item.quantity}
							onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
							loading={loading}
							onClickRemove={() => removeCartItem(item.id)}
						/>
					))}
				</div>

				<SheetFooter className="-mx-6 bg-white p-8">
					<div className="w-full">
						<div className="flex mb-4">
							<span className="flex flex-1 text-lg text-natural-500">
								Итого
								<div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
							</span>
							<span className="font-bold text-lg"> {totalAmount} ₽</span>
						</div>

						<Link href="/cart">
							<Button
								type="submit"
								className="w-full h-12 text-base"
							>
								Оформить заказ
								<ArrowRight className="w-5 ml-2" />
							</Button>
						</Link>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
