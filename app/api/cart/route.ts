import { prisma } from "@/prisma/prisma-client";
import { findOrCreateCart } from "@/shared/lib/find-or-create-cart";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(req: NextRequest) {
	try {
		const token = req.cookies.get("cartToken")?.value;
		if (!token) {
			return NextResponse.json({ totalAmount: 0, items: [] });
		}

		const userCart = await prisma.cart.findFirst({
			where: { token },
			include: {
				items: {
					orderBy: {
						createdAt: "desc"
					},
					include: {
						productItem: {
							include: {
								product: true
							}
						},
						ingredients: true
					}
				}
			}
		});

		return NextResponse.json(userCart);
	} catch (err) {
		console.log(err); // TODO
	}
}

export async function POST(req: NextRequest) {
	try {
		let token = req.cookies.get("cartToken")?.value;
		if (!token) {
			token = crypto.randomUUID();
		}

		const userCart = await findOrCreateCart(token);
		const data = (await req.json()) as CreateCartItemValues;
		const foundCartItem = await prisma.cartItem.findFirst({
			where: {
				cartId: userCart.id,
				productItemId: data.productItemId,
				ingredients: { every: { id: { in: data.ingredientsIds } } }
			}
		});

		if (foundCartItem) {
			await prisma.cartItem.update({
				where: {
					id: foundCartItem.id
				},
				data: {
					quantity: foundCartItem.quantity + 1
				}
			});
		} else {
			await prisma.cartItem.create({
				data: {
					cartId: userCart.id,
					productItemId: data.productItemId,
					quantity: 1,
					ingredients: {
						connect: data.ingredientsIds?.map(id => ({ id }))
					}

				}
			});
		}

		const updatedUserCart = await updateCartTotalAmount(token);
		const res = NextResponse.json(updatedUserCart);
		res.cookies.set("cartToken", token);

		return res;
	} catch (err) {
		console.log(err); // TODO: change
		return NextResponse.json({ message: "Error" }, { status: 500 });
	}
}
