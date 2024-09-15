"use client";

import React from "react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetFooter,
	SheetTrigger,
	SheetClose,
} from "@/shared/components/ui/sheet";
import Link from "next/link";
import { Button } from "../ui";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib/get-cart-item-details";
import Image from "next/image";
import { Title } from "./title";
import { useCart } from "@/shared/hooks/use-cart";

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
	const { updateItemQuantity, removeCartItem, items, totalAmount, loading } = useCart(true);

	const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
		const value = type === "plus" ? quantity + 1 : quantity - 1;
		updateItemQuantity(id, value);
	};

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
				{items.length > 0 ? (
					<>
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
									details={getCartItemDetails({ pizzaSize: item.pizzaSize, pizzaType: item.pizzaType, ingredients: item.ingredients })}
									disabled={item.disabled}
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

								<Link href="/checkout">
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
					</>
				) : (
					<div className="flex-1 flex flex-col items-center justify-center">
						<Image
							src="/assets/images/empty-box.png"
							alt="Корзина пуста"
							width={120}
							height={120}
						/>
						<Title size="sm" text="Корзина пуста" className="text-center font-bold my-2" />
						<p className="text-center text-neutral-500 mb-5">
							Добавьте хотя бы одну позицию в корзину, чтобы оформить заказ
						</p>

						<SheetClose className="w-full">
							<Button className="w-full h-12 text-base">
								<ArrowLeft className="w-5 mr-2" />
								Вернуться назад
							</Button>
						</SheetClose>
					</div>
				)}
			</SheetContent>
		</Sheet>
	);
};
