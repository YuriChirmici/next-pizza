"use client";

import { cn } from "@/shared/lib/utils";
import React from "react";
import { useCategoryStore } from "@/shared/store/category";
import { useRouter } from "next/navigation";
import { Category, Product } from "@prisma/client";

interface ICategory extends Category {
	products: Product[]
}

interface Props {
	className?: string;
	categories: ICategory[];
}

export const Categories: React.FC<Props> = ({ className, categories }) => {
	const categoryActiveId = useCategoryStore((state) => state.activeId);
	const router = useRouter();

	const navigateToCategory = (name: string) => {
		const currentUrl = new URL(window.location.href);
		const query = currentUrl.searchParams.toString();
		router.push(`${currentUrl.pathname}?${query}#${name}`);
	};

	return (
		<div className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}>
			{categories.filter(c => c.products?.length).map(({ id, name }) => (
				<a
					className={cn(
						"flex items-center font-bold h-11 rounded-2xl px-5 cursor-pointer",
						categoryActiveId === id && "bg-white shadow-md shadow-gray-200 text-primary"
					)}
					onClick={() => navigateToCategory(name)}
					key={id}
				>
					{name}
				</a>
			))}
		</div>
	);
};
