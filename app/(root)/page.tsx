import { Container, ProductsGroupList, Title, TopBar } from "@/shared/components/shared";
import { Filters } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { Suspense } from "react";
import { findPizzas, GetSearchParams } from "@/shared/lib/find-pizzas";

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
	const categories = await findPizzas(searchParams);

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
									items={category.products}
								/>
							)
						))}
					</div>
				</div>

			</div>
		</Container>
	</>;
}
