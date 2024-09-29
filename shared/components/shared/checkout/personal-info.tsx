import React from "react";
import { FormInput } from "../form";
import { WhiteBlock } from "../white-block";
import { useSession } from "next-auth/react";

interface Props {
	className?: string;
}

export const CheckoutPersonalInfo: React.FC<Props> = ({ className }) => {
	return (
		<WhiteBlock className={className} title="2. Персональная информация">
			<div className="grid grid-cols-2 gap-5">
				<FormInput name="firstName" className="text-base" placeholder="Имя" />
				<FormInput name="lastName" className="text-base" placeholder="Фамилия" />
				<FormInput name="email" className="text-base" placeholder="E-Mail" />
				<FormInput name="phone" className="text-base" placeholder="Телефон" />
			</div>
		</WhiteBlock>
	);
};
