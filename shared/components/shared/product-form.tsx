"use client";

import React from "react";
import toast from "react-hot-toast";
import { ChoosePizzaForm, ChooseProductForm, Container } from ".";
import { useCartStore } from "../../store/cart";
import { ProductWithRelations } from "@/@types/prisma";

interface Props {
	product: ProductWithRelations;
	onDone?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, onDone }) => {
	const [ onCartItem, loading ] = useCartStore((store) => [ store.addCartItem, store.loading ]);

	const firstItem = product.items[0];
	const isPizzaForm = !!firstItem.pizzaType;

	const onSubmitProduct = async (productItemId: number, ingredientsIds?: number[]) => {
		try {
			await onCartItem({ productItemId, ingredientsIds });
			toast.success("Продукт добавлен в корзину");
			onDone?.();
		} catch (err) {
			console.error(err);
			toast.error("Не удалось добавить продукт в корзину");
		}
	};

	return (
		<Container className="flex flex-col my-10">
			{isPizzaForm ? (
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
		</Container>
	);
};
