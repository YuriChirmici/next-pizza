"use client";

import React from "react";
import { useIntersection } from "react-use";

import { Title } from "./title";
import { ProductCard } from "./product-card";
import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";

interface Item {
	id: number;
	name: string;
	imageUrl: string;
	price: number;
}

interface Props {
	title: string;
	items: Item[];
	categoryId: number;
	className?: string;
	listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
	title,
	items,
	categoryId,
	className,
	listClassName,
}) => {
	const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
	const intersectionRef = React.useRef(null);
	const intersection = useIntersection(intersectionRef, {
		threshold: 0.4
	});

	React.useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveCategoryId(categoryId);
		}
	}, [ categoryId, intersection?.isIntersecting, setActiveCategoryId ]);

	return (
		<div className={className} id={title} ref={intersectionRef}>
			<Title text={title} size="lg" className="font-extrabold mb-5" />
			<div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
				{items.map((item, i) => (
					<ProductCard
						key={item.id}
						id={item.id}
						name={item.name}
						imageUrl={item.imageUrl}
						price={item.price}
					/>
				))}
			</div>
		</div>
	);
};
