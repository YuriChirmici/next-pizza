"use server";

import { createPayment } from "@/payment/stripe/create-payment";
import { prisma } from "@/prisma/prisma-client";
import { PayOrderTemplate } from "@/shared/components/shared/email-templates/pay-order";
import { UserVerificationTemplate } from "@/shared/components/shared/email-templates/user-verification";
import { getUserSession } from "@/shared/lib/get-user-session";
import { sendEmail } from "@/shared/lib/send-email";
import { TFormOrderData } from "@/shared/schemas/order-form-schema";
import { Order, OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";

export async function createOrder(data: TFormOrderData): Promise<string | null | undefined> {
	try {
		const cookieStore = cookies();
		const token = cookieStore.get("cartToken")?.value;
		if (!token) {
			throw new Error("Cart token not found");
		}

		const userCart = await prisma.cart.findFirst({
			include: {
				user: true,
				items: {
					include: {
						ingredients: true,
						productItem: {
							include: {
								product: true,
							},
						},
					},
				},
			},
			where: { token },
		});

		if (!userCart) {
			throw new Error("Cart not found");
		}

		if (!userCart?.totalAmount) {
			return;
		}

		const order = await prisma.order.create({
			data: {
				// userId,
				token,
				fullName: data.firstName + " " + data.lastName,
				email: data.email,
				phone: data.phone,
				address: data.address,
				comment: data.comment,
				totalAmount: userCart.totalAmount,
				status: OrderStatus.PENDING,
				items: JSON.stringify(userCart.items),
				paymentProvider: "STRIPE",
			},
		});

		const paymentData = await createPayment({
			orderId: order.id,
			amount: order.totalAmount,
			description: `Заказ #${order.id}`,
		});

		await prisma.order.update({
			where: { id: order.id },
			data: {	paymentId: paymentData.id },
		});

		if (paymentData.url) {
			await sendOrderPaymentEmail(order, data.email, paymentData.url);
		}

		await clearCart(userCart.id);

		return paymentData.url;
	} catch (err) {
		console.log("[CART_CHECKOUT_POST] Server error", err);
		throw err;
	}
};

async function clearCart(id: number): Promise<void> {
	await prisma.cart.update({
		where: { id },
		data: {
			totalAmount: 0,
		},
	});

	await prisma.cartItem.deleteMany({
		where: {
			cartId: id,
		},
	});
}

async function sendOrderPaymentEmail(order: Order, email: string, url: string): Promise<void> {
	const paymentTemplate = PayOrderTemplate({
		orderId: order.id,
		totalAmount: order.totalAmount,
		paymentUrl: url
	});

	await sendEmail({
		to: email,
		subject: `Next Pizza / Оплатите заказ #${order.id}`,
		react: paymentTemplate
	});
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
	try {
		const currentUser = await getUserSession();
		if (!currentUser) {
			throw new Error("Пользователь не найден");
		}

		const findUser = await prisma.user.findFirst({ where: { id: Number(currentUser.id) } });
		if (!findUser) {
			throw new Error("Пользователь не найден");
		}

		await prisma.user.update({
			where: {
				id: Number(currentUser.id),
			},
			data: {
				fullName: body.fullName,
				email: body.email,
				password: body.password ? hashSync(body.password as string, 10) : findUser.password,
			},
		});
	} catch (err) {
		console.log("Error [UPDATE_USER]", err);
		throw err;
	}
}

export async function registerUser(body: Prisma.UserCreateInput) {
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: body.email,
			},
		});

		if (user) {
			if (!user.verified) {
				throw new Error("Почта не подтверждена");
			}

			throw new Error("Пользователь уже существует");
		}

		const createdUser = await prisma.user.create({
			data: {
				fullName: body.fullName,
				email: body.email,
				password: hashSync(body.password as string, 10),
			},
		});

		const code = Math.floor(100000 + Math.random() * 900000).toString();

		await prisma.verificationCode.create({
			data: {
				code,
				userId: createdUser.id,
			},
		});

		await sendEmail({
			to: createdUser.email,
			subject: "Next Pizza / Подтверждение регистрации",
			react: UserVerificationTemplate({
				code,
				userId: createdUser.id,
			}),
		});
	} catch (error) {
		console.log("Error [CREATE_USER]", error);
		throw error;
	}
}
