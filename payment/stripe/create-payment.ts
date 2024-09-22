import { stripe } from "./stripe-client";

interface Props {
	orderId: number;
	amount: number;
	description: string;
}

const USD_RUB = 90; // TODO: Get exchange rate from API

export const createPayment = async ({ orderId, amount, description }: Props) => {
	const session = await stripe.checkout.sessions.create({
		payment_method_types: [ "card" ],
		line_items: [ {
			price_data: {
				currency: "usd",
				product_data: {
					name: description,
				},
				unit_amount: Math.round(amount * 100 / USD_RUB),
			},
			quantity: 1,
		} ],
		mode: "payment",
		success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/session/success?session_id={CHECKOUT_SESSION_ID}&orderId=${orderId}`,
		cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/session/cancel?session_id={CHECKOUT_SESSION_ID}&orderId=${orderId}`,
	});

	return session;
};
