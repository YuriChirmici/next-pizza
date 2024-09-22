import { stripe } from "@/payment/stripe/stripe-client";
import { prisma } from "@/prisma/prisma-client";
import { OrderSuccessTemplate } from "@/shared/components/shared/email-templates/order-success";
import { sendEmail } from "@/shared/lib/send-email";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import { Order } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const url = new URL(req.url);

	const orderId = url.searchParams.get("orderId");
	const sessionId = url.searchParams.get("session_id");
	if (!sessionId || !orderId) {
		return NextResponse.json({ error: "Data not found" }, { status: 500 });
	}

	const session = await stripe.checkout.sessions.retrieve(sessionId);
	if (session.payment_status !== "paid") {
		return NextResponse.json({ error: "Payment status error" }, { status: 500 });
	}

	const order = await prisma.order.update({
		where: { id: Number(orderId) },
		data: { status: "SUCCEEDED" },
	});

	if (!order) {
		return NextResponse.json({ error: "Order not found" }, { status: 404 });
	}

	await sendSuccessPaymentEmail(order);

	return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_BASE_URL));
}

async function sendSuccessPaymentEmail(order: Order): Promise<void> {
	const items = JSON.parse(order.items as string) as CartItemDTO[];
	const orderTemplate = OrderSuccessTemplate({
		orderId: order.id,
		totalAmount: order.totalAmount,
		items
	});

	await sendEmail({
		to: order.email,
		subject: `Next Pizza / Успешный заказ #${order.id}`,
		react: orderTemplate
	});
}

