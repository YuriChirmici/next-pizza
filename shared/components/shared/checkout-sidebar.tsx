import React from "react";
import { WhiteBlock } from "./white-block";
import { Button } from "../ui/button";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { CheckoutItemsDetails } from "./checkout-items-details";
import { cn } from "@/shared/lib/utils";
import { Skeleton } from "../ui";

interface Props {
	productsAmount: number;
	className?: string;
	loading?: boolean;
}

const VAT = 15;
const DELIVERY_PRICE = 250;

export const CheckoutSidebar: React.FC<Props> = ({
	productsAmount,
	className,
	loading,
}) => {
	const vatPrice = (productsAmount * VAT) / 100;
	const totalPrice = productsAmount + DELIVERY_PRICE + vatPrice;

	const checkoutItemDetailsSkeleton = <Skeleton className="w-24 h-7 rounded-[8px]" />;
	const checkoutItemsDetails = [
		{
			icon: <Package size={16} />,
			text: "Стоимость заказа:",
			value: `${productsAmount} ₽`,
		},
		{
			icon: <Percent size={16} />,
			text: "Налоги:",
			value: `${vatPrice.toFixed(2)} ₽`,
		},
		{
			icon: <Truck size={16} />,
			text: "Доставка:",
			value: `${DELIVERY_PRICE} ₽`,
		},
	];

	return (
		<WhiteBlock className={cn("p-6 sticky top-4", className)}>
			<div className="flex flex-col gap-1">
				<span className="text-xl">Итого</span>
				{loading ? (
					<Skeleton className="w-40 h-9" />
				) : (
					<span className="text-3xl font-extrabold">{totalPrice.toFixed(2)} ₽</span>
				)}
			</div>

			{checkoutItemsDetails.map((item, index) => (
				<CheckoutItemsDetails
					key={index}
					icon={item.icon}
					text={item.text}
					value={loading ? checkoutItemDetailsSkeleton : item.value}
				/>
			))}

			<Button
				type="submit"
				className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
			>
				Перейти к оплате
				<ArrowRight className="w-5 ml-2" />
			</Button>
		</WhiteBlock>
	);
};
