"use client";

import { cn } from "@/shared/lib/utils";
import { API } from "@/shared/services/api-client";
import { Product } from "@prisma/client";
import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useClickAway, useDebounce } from "react-use";

interface Props {
	className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
	const [ focused, setFocused ] = React.useState(false);
	const [ searchText, setSearchText ] = React.useState("");
	const [ products, setProducts ] = React.useState<Product[]>([]);
	const ref = React.useRef(null);

	useClickAway(ref, () => {
		setFocused(false);
	});

	useDebounce(() => {
		API.products.search(searchText).then(data => setProducts(data));
	}, 400, [ searchText ]);

	const onClickItem = () => {
		setFocused(false);
		setSearchText("");
	};

	return (
		<>
			{ focused && (
				<div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30"/>
			)}

			<div className={cn("flex rounded-2xl flex-1 justify-between relative h-11 z-30", className)} ref={ref}>
				<Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />

				<input
					className="rounded-2xl outline-none w-full bg-gray-50 pl-11"
					type="text"
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					placeholder="Найти пиццу..."
					onFocus={() => setFocused(true)}
				/>

				<div className={cn(
					"absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
					focused && "visible opacity-100 top-12"
				)}>
					{products.length ? products.map((product) => (
						<Link
							key={product.id}
							onClick={onClickItem}
							href={`/product/${product.id}`}
							className="flex items-center gap-3 px-3 py-2 hover:bg-primary/10"
						>
							<img className="rounded-sm h-8 w-8" src={product.imageUrl} alt={product.name} />
							<span>
								{product.name}
							</span>
						</Link>
					))	:
						<div className="px-5 py-1">
							Ничего не найдено
						</div>
					}

				</div>
			</div>
		</>
	);
};
