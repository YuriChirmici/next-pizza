"use client";

import React, { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { DialogContent, Dialog } from "@/shared/components/ui/dialog";
import { useRouter } from "next/navigation";
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePizzaForm, ChooseProductForm } from "..";
import { useCartStore } from "@/shared/store/cart";
import toast from "react-hot-toast";

interface Props {
	product: ProductWithRelations;
	className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
	const router = useRouter();
	const firstItem = product.items[0];
	const isPizzaForm = !!firstItem.pizzaType;
	const [ onCartItem, loading ] = useCartStore((store) => [ store.addCartItem, store.loading ]);

	const onSubmitProduct = async (productItemId: number, ingredientsIds?: number[]) => {
		try {
			await onCartItem({ productItemId, ingredientsIds });
			toast.success("Продукт добавлен в корзину");
			router.back();
		} catch (err) {
			console.error(err);
			toast.error("Не удалось добавить продукт в корзину");
		}
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
						onSubmitProduct={onSubmitProduct}
						loading={loading}
					/>
				) : (
					<ChooseProductForm
						price={firstItem.price}
						imageUrl={product.imageUrl}
						name={product.name}
						onSubmitProduct={() => onSubmitProduct(firstItem.id)}
						loading={loading}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
};
