import { Container, ProductsGroupList, Title, TopBar } from "@/shared/components/shared";
import { Filters } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { Suspense } from "react";

export default async function Home() {
	const categories = await prisma.category.findMany({
		include: {
			products: {
				include: {
					items: true,
					ingredients: true,
				}
			}
		}
	});

	return <>
		<Container className="mt-10">
			<Title text="Все категории" size="lg" className="font-extrabold" />

		</Container>

		<TopBar categories={categories} />

		<Container className="pb-14 mt-10">
			<div className="flex gap-[80px]">

				{/* Filters */}
				<div className="w-[250px]">
					<Suspense>
						<Filters />
					</Suspense>
				</div>

				{/* Products */}
				<div className="flex-1">
					<div className="flex flex-col gap-16">
						Список товаров

						{categories.map((category) => (
							!!category.products?.length && (
								<ProductsGroupList
									key={category.id}
									title={category.name}
									categoryId={category.id}
									items={category.products.map((product) => ({
										id: product.id,
										name: product.name,
										imageUrl: product.imageUrl,
										price: 300, //
									}))}
								/>
							)
						))}
					</div>
				</div>

			</div>
		</Container>
	</>;
}
