import { hashSync } from "bcrypt";
import { prisma } from "./prisma-client";
import { categories, ingredients, products } from "./constants";

const randomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) + min);
};

const generateProductItem = (id: number) => ({
	productId: id,
	price: randomNumber(100, 500)
});

async function up() {

	await Promise.all([
		prisma.user.createMany({
			data: [
				{
					fullName: "User Test",
					email: "user@test.com",
					password: hashSync("111111", 10),
					verified: new Date(),
					role: "USER",
				},
				{
					fullName: "Admin Admin",
					email: "admin@test.com",
					password: hashSync("111111", 10),
					verified: new Date(),
					role: "ADMIN"
				},
			]
		}),
		prisma.category.createMany({ data: categories }),
		prisma.ingredient.createMany({ data: ingredients }),
	]);

	const createdProductsIds = [];
	for (const product of products) {
		const createdProduct = await prisma.product.create({
			data: product,
		});
		createdProductsIds.push(createdProduct.id);
	}

	const pizza1 = await prisma.product.create({
		data: {
			name: "Пепперони",
			imageUrl: "https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif",
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(0, 5)
			}
		}
	});

	const pizza2 = await prisma.product.create({
		data: {
			name: "Сырная",
			imageUrl: "https://media.dodostatic.net/image/r:233x233/11EE7D614CBE0530B7234B6D7A6E5F8E.avif",
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(5, 10)
			}
		}
	});

	const pizza3 = await prisma.product.create({
		data: {
			name: "Чоризо",
			imageUrl: "https://media.dodostatic.net/image/r:233x233/11EE7D614CBE0530B7234B6D7A6E5F8E.avif",
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(10, 15)
			}
		}
	});

	await prisma.productItem.createMany({
		data: [
			// pizza1
			{
				productId: pizza1.id,
				price: randomNumber(190, 600),
				pizzaType: 1,
				size: 20,
			},
			{
				productId: pizza1.id,
				price: randomNumber(240, 650),
				pizzaType: 2,
				size: 30,
			},
			{
				productId: pizza1.id,
				price: randomNumber(290, 700),
				pizzaType: 2,
				size: 40,
			},

			// pizza2
			{
				productId: pizza2.id,
				price: randomNumber(190, 600),
				pizzaType: 2,
				size: 20,
			},
			{
				productId: pizza2.id,
				price: randomNumber(240, 650),
				pizzaType: 1,
				size: 30,
			},
			{
				productId: pizza2.id,
				price: randomNumber(460, 950),
				pizzaType: 1,
				size: 40,
			},

			// pizza3
			{
				productId: pizza3.id,
				price: randomNumber(190, 600),
				pizzaType: 2,
				size: 20,
			},
			{
				productId: pizza3.id,
				price: randomNumber(140, 450),
				pizzaType: 2,
				size: 30,
			},
			{
				productId: pizza3.id,
				price: randomNumber(290, 700),
				pizzaType: 1,
				size: 40,
			},
		]
	});

	await prisma.productItem.createMany({ data: createdProductsIds.map((id) => generateProductItem(id)) });

	await prisma.cart.createMany({
		data: [
			{
				userId: 1,
				totalAmount: 0,
				token: "111111"
			},
			{
				userId: 2,
				totalAmount: 0,
				token: "222222"
			}
		]
	});

	await prisma.cartItem.create({
		data: {
			productItemId: 1,
			cartId: 1,
			quantity: 2,
			ingredients: {
				connect: [ { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 } ]
			}
		}
	});
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE	`;
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE	`;
	await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE	`;
	await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE	`;
	await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE	`;
	await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE	`;
	await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE	`;
}

async function main() {
	try {
		await down();
		await up();
	} catch (err) {
		console.error(err);
	}
}

main()
	.then(() => prisma.$disconnect())
	.catch(async (err) => {
		console.error(err);
		await prisma.$disconnect();
		process.exit(1);
	});
