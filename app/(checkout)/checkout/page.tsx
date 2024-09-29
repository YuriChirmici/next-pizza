"use client";

import { Container } from "@/shared/components/shared/container";
import { FormProvider, useForm } from "react-hook-form";
import { Title } from "@/shared/components/shared/title";
import { CheckoutSidebar } from "@/shared/components/shared";
import { useCart } from "@/shared/hooks/use-cart";
import React from "react";
import toast from "react-hot-toast";
import { TFormOrderData, orderFormSchema } from "@/shared/schemas/order-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { API } from "@/shared/services/api-client";
import { CheckoutCart } from "@/shared/components/shared/checkout/cart";
import { CheckoutAddress, CheckoutPersonalInfo } from "@/shared/components/shared/checkout";
import { createOrder } from "@/app/actions";
import { useSession } from "next-auth/react";

export default function CheckoutPage() {
	const { totalAmount: productsAmount, items, loading, updateItemQuantity, removeCartItem } = useCart(true);
	const [ submitting, setSubmitting ] = React.useState(false);
	const { data: session } = useSession();

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

	React.useEffect(() => {
		async function fetchUserInfo() {
			const data = await API.auth.getMe();
			const [ firstName, lastName ] = data.fullName.split(" ");

			form.setValue("firstName", firstName);
			form.setValue("lastName", lastName);
			form.setValue("email", data.email);
		}

		if (session) {
			fetchUserInfo();
		}
	}, [ session ]);

	const onSubmit = async (data: TFormOrderData) => {
		try {
			setSubmitting(true);
			await new Promise((resolve) => setTimeout(resolve, 2000));

			const url = await createOrder(data);

			toast.success("Заказ успешно оформлен! 📝", {
				icon: "✅",
			});

			if (url) {
				location.href = url;
			}
		} catch (err) {
			console.error(err);
			return toast.error("Не удалось создать заказ", {
				icon: "❌",
			});
		} finally {
			setSubmitting(false);
		}
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
							<CheckoutSidebar productsAmount={productsAmount} loading={loading || submitting} />
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	);
}
