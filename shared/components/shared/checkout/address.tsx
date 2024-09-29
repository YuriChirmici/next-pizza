"use client";

import React from "react";
import { WhiteBlock } from "../white-block";
import { FormInput, FormTextarea } from "../form";

interface Props {
	className?: string;
}

export const CheckoutAddress: React.FC<Props> = ({ className }) => {
	return (
		<WhiteBlock className={className} title="3. Адрес доставки">
			<div className="flex flex-col gap-5">
				<FormInput name="address" className="text-base" placeholder="Адрес" />
				<FormTextarea
					className="text-base"
					name="comment"
					rows={5}
					placeholder="Комментарий к заказу"
				/>
			</div>
		</WhiteBlock>
	);
};
