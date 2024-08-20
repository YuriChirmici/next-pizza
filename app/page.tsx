import { Container, Title, TopBar } from "@/components/shared";
import { Filters } from "@/components/shared";

export default function Home() {
	return <>
		<Container className="mt-10">
			<Title text="Все пиццы" size="lg" className="font-extrabold" />

		</Container>

		<TopBar />

		<Container className="pb-14 mt-10">
			<div className="flex gap-[60px]">

				{/* Filters */}
				<div className="w-[250px]">
					<Filters />
				</div>

				{/* Products */}
				<div className="flex-1">
					<div className="flex flex-col gap-16">
						Список товаров
					</div>
				</div>


			</div>
		</Container>
	</>
}
