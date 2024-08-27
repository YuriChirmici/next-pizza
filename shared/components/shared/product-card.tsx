import Link from "next/link";
import React from "react";
import { Title } from "./title";
import { Plus } from "lucide-react";
import { Button } from "../ui";

interface Props {
	id: number;
	name: string;
	price: number;
	count?: number;
	imageUrl: string;
	className?: string;
}

export const ProductCard: React.FC<Props> = ({ id, name, price, count, imageUrl, className }) => {
	return (
		<div className={className}>
			<Link href={`/product/${id}`}>
				<div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
					<img className="max-w-full h-auto object-cover" src={imageUrl} alt={name} />
				</div>

				<Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
				<p className="text-sm text-gray-400">
					Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок
				</p>

				<div className="flex justify-between items-center mt-4">
					<span className="text-[20px]">
						от <b>{price} ₽</b>
					</span>
					<Button>
						<Plus size={20} className="mr-1" />
						<span>Добавить</span>
					</Button>
				</div>
			</Link>
		</div>
	);
};
