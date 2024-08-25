"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { useCategoryStore } from "@/store/category";
import { useRouter } from "next/navigation";

interface Props {
	className?: string;
}

const categories = [
	{ id: 1, name: "Пиццы" },
	{ id: 2, name: "Комбо" },
	{ id: 3, name: "Закуски" },
	{ id: 4, name: "Коктейли" },
	{ id: 5, name: "Кофе" },
	{ id: 6, name: "Напитки" },
	{ id: 7, name: "Десерты" },
];

export const Categories: React.FC<Props> = ({ className }) => {
	const categoryActiveId = useCategoryStore((state) => state.activeId);
	const router = useRouter();

	const navigateToCategory = (name: string) => {
		const currentUrl = new URL(window.location.href);
		const query = currentUrl.searchParams.toString();
		router.push(`${currentUrl.pathname}?${query}#${name}`);
	};

	return (
		<div className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}>
			{categories.map(({ id, name }) => (
				<a
					className={cn(
						"flex items-center font-bold h-11 rounded-2xl px-5",
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
