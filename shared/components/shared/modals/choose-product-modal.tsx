"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { DialogContent, Dialog } from "@/shared/components/ui/dialog";
import { useRouter } from "next/navigation";
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePizzaForm, ChooseProductForm } from "..";

interface Props {
	product: ProductWithRelations;
	className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
	const router = useRouter();
	const isPizzaForm = !!product.items[0].pizzaType;

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[560px] bg-white overflow-hidden", className)}>
				{ isPizzaForm ? (
					<ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} ingredients={[]} items={[]} />
				) : (
					<ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
				)}
			</DialogContent>
		</Dialog>
	);
};
