"use client";

import React from "react";
import { Button } from "../ui";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { CartDrawer } from "./cart-drawer";
import { useCartStore } from "@/shared/store/cart";

interface Props {
	className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
	const [ productsCount, totalPrice, loading ] = useCartStore((store) => [
		store.items.length,
		store.totalAmount,
		store.loading,
	]);

	return (
		<CartDrawer>
			<Button
				loading={loading}
				className={cn("group relative", { "w-[120px]": loading }, className)}
			>
				<b> {totalPrice} ₽ </b>
				<span className="h-full w-[1px] bg-white/30 mx-3" />
				<div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
					<ShoppingCart className="relative" size={16} strokeWidth={2} />
					<b> {productsCount} </b>
				</div>
				<ArrowRight size={20} className="absolute right-5 transition duration-300 -translate-x-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
			</Button>
		</CartDrawer>
	);
};
