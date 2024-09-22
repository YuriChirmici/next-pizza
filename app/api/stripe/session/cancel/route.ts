import { stripe } from "@/payment/stripe/stripe-client";
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const url = new URL(req.url);

	const orderId = url.searchParams.get("orderId");
	const sessionId = url.searchParams.get("session_id");
	if (!sessionId || !orderId) {
		return NextResponse.json({ error: "Data not found" }, { status: 404 });
	}

	const session = await stripe.checkout.sessions.retrieve(sessionId);

	if (session.payment_status !== "unpaid") {
		return NextResponse.json({ error: "Payment status error" }, { status: 500 });
	}

	await prisma.order.update({
		where: { id: Number(orderId) },
		data: { status: "CANCELLED" },
	});

	return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_BASE_URL));
}
