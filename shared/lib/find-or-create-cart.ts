import { prisma } from "@/prisma/prisma-client";

export const findOrCreateCart = async (token: string) => {
	let userCart = await prisma.cart.findFirst({
		where: { token }
	});

	if (userCart) {
		return userCart;
	}

	return await prisma.cart.create({
		data: { token }
	});
};
