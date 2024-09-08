"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { DialogContent, Dialog } from "@/shared/components/ui/dialog";
import { useRouter } from "next/navigation";
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePizzaForm, ChooseProductForm } from "..";
import { useCartStore } from "@/shared/store/cart";

interface Props {
	product: ProductWithRelations;
	className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
	const router = useRouter();
	const firstItem = product.items[0];
	const isPizzaForm = !!firstItem.pizzaType;
	const onCartItem = useCartStore((store) => store.addCartItem);

	const onAddPizza = (productItemId: number, ingredientsIds: number[]) => {
		onCartItem({ productItemId, ingredientsIds });
	};

	const onAddProduct = () => {
		onCartItem({ productItemId: firstItem.id });
	};

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden", className)}>
				{ isPizzaForm ? (
					<ChoosePizzaForm
						imageUrl={product.imageUrl}
						name={product.name}
						ingredients={product.ingredients}
						items={product.items}
						onSubmit={onAddPizza}
					/>
				) : (
					<ChooseProductForm
						price={firstItem.price}
						imageUrl={product.imageUrl}
						name={product.name}
						onSubmit={onAddProduct}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
};
