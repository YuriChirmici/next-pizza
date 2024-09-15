"use client";

// import { CartItem } from "@/shared/components/shared/cart-item";
// import { CartSidebar } from "@/shared/components/shared/cart-sidebar";
import { Container } from "@/shared/components/shared/container";
// import { CartItemSkeleton } from "@/shared/components/shared/skeletons/cart-item-skeleton";
import { Controller, FormProvider, useForm } from "react-hook-form";

import { Title } from "@/shared/components/shared/title";
import { CheckoutItem, CheckoutSidebar, FormInput, WhiteBlock } from "@/shared/components/shared";
import { useCart } from "@/shared/hooks/use-cart";
import React from "react";
import toast from "react-hot-toast";
import { TFormOrderData, orderFormSchema } from "@/shared/schemas/order-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
// import { FormInput, FormTextarea } from "@/shared/components/shared/form";
// import { AdressInput } from "@/shared/components/shared/adress-input";
// import { createOrder } from "@/shared/app/actions";
// import { useSession } from "next-auth/react";
import { API } from "@/shared/services/api-client";
import { getCartItemDetails } from "@/shared/lib/get-cart-item-details";
import { CheckoutCart } from "@/shared/components/shared/checkout/cart";
import { CheckoutAddress, CheckoutPersonalInfo } from "@/shared/components/shared/checkout";

export default function CheckoutPage() {
	const { totalAmount: productsAmount, items, loading, updateItemQuantity, removeCartItem } = useCart(true);
	// const [ submitting, setSubmitting ] = React.useState(false);
	// const { data: session } = useSession();

	const form = useForm<TFormOrderData>({
		resolver: zodResolver(orderFormSchema),
		defaultValues: {
			email: "",
			firstName: "",
			lastName: "",
			phone: "",
			address: "",
			comment: "",
		},
	});

	// React.useEffect(() => {
	// 	async function fetchUserInfo() {
	// 		const data = await API.auth.getMe();
	// 		const [ firstName, lastName ] = data.fullName.split(" ");

	// 		form.setValue("firstName", firstName);
	// 		form.setValue("lastName", lastName);
	// 		form.setValue("email", data.email);
	// 	}

	// 	if (session) {
	// 		fetchUserInfo();
	// 	}
	// }, [ session ]);

	const onSubmit = async (data: TFormOrderData) => {
		console.log(data);
		// try {
		// 	setSubmitting(true);

		// 	const url = await createOrder(data);

		// 	toast.error("Заказ успешно оформлен! 📝", {
		// 		icon: "✅",
		// 	});

		// 	if (url) {
		// 		location.href = url;
		// 	}
		// } catch (error) {
		// 	return toast.error("Неверный E-Mail или пароль", {
		// 		icon: "❌",
		// 	});
		// } finally {
		// 	setSubmitting(false);
		// }
	};

	return (
		<Container className="mt-5">
			<Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />

			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex gap-10">
						<div className="flex flex-col gap-10 flex-1 mb-20">
							<CheckoutCart />
							<CheckoutPersonalInfo className={loading ? "opacity-40 pointer-events-none" : "" } />
							<CheckoutAddress className={loading ? "opacity-40 pointer-events-none" : ""} />
						</div>

						<div className="w-[450px]">
							<CheckoutSidebar productsAmount={productsAmount} loading={loading} />
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	);
}
