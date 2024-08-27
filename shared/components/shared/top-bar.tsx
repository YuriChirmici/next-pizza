import React from "react";
import { Categories } from "./categories";
import { SortPopup } from "./sort-popup";
import { cn } from "@/shared/lib/utils";
import { Container } from "./container";
import { Category, Product } from "@prisma/client";

interface ICategory extends Category {
	products: Product[]
}

interface Props {
	className?: string;
	categories: ICategory[];
}

export const TopBar: React.FC<Props> = ({ className, categories }) => {
	return (
		<div className={cn("sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10", className)}>
			<Container className="flex justify-between">
				<Categories categories={categories.filter(category => category.products?.length)} />
				<SortPopup />
			</Container>
		</div>
	);
};
