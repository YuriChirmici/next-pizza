import { Container, ProductCard, ProductsGroupList, Title, TopBar } from "@/components/shared";
import { Filters } from "@/components/shared";

export default function Home() {
	return <>
		<Container className="mt-10">
			<Title text="Все пиццы" size="lg" className="font-extrabold" />

		</Container>

		<TopBar />

		<Container className="pb-14 mt-10">
			<div className="flex gap-[80px]">

				{/* Filters */}
				<div className="w-[250px]">
					<Filters />
				</div>

				{/* Products */}
				<div className="flex-1">
					<div className="flex flex-col gap-16">
						Список товаров
						<ProductsGroupList
							title="Пиццы"
							items={[
								{
									id: 1,
									name: "Бефстроганов",
									imageUrl: "https://media.dodostatic.net/image/r:233x233/11EEF9E43DC39C94AA5765DBF1C97100.avif",
									price: 549,
								}, {
									id: 2,
									name: "Бефстроганов",
									imageUrl: "https://media.dodostatic.net/image/r:233x233/11EEF9E43DC39C94AA5765DBF1C97100.avif",
									price: 549,
								}, {
									id: 3,
									name: "Бефстроганов",
									imageUrl: "https://media.dodostatic.net/image/r:233x233/11EEF9E43DC39C94AA5765DBF1C97100.avif",
									price: 549,
								}, {
									id: 4,
									name: "Бефстроганов",
									imageUrl: "https://media.dodostatic.net/image/r:233x233/11EEF9E43DC39C94AA5765DBF1C97100.avif",
									price: 549,
								}, {
									id: 5,
									name: "Бефстроганов",
									imageUrl: "https://media.dodostatic.net/image/r:233x233/11EEF9E43DC39C94AA5765DBF1C97100.avif",
									price: 549,
								}, {
									id: 6,
									name: "Бефстроганов",
									imageUrl: "https://media.dodostatic.net/image/r:233x233/11EEF9E43DC39C94AA5765DBF1C97100.avif",
									price: 549,
								}, {
									id: 7,
									name: "Бефстроганов",
									imageUrl: "https://media.dodostatic.net/image/r:233x233/11EEF9E43DC39C94AA5765DBF1C97100.avif",
									price: 549,
								}, {
									id: 8,
									name: "Бефстроганов",
									imageUrl: "https://media.dodostatic.net/image/r:233x233/11EEF9E43DC39C94AA5765DBF1C97100.avif",
									price: 549,
								}, {
									id: 9,
									name: "Бефстроганов",
									imageUrl: "https://media.dodostatic.net/image/r:233x233/11EEF9E43DC39C94AA5765DBF1C97100.avif",
									price: 549,
								}, {
									id: 10,
									name: "Бефстроганов",
									imageUrl: "https://media.dodostatic.net/image/r:233x233/11EEF9E43DC39C94AA5765DBF1C97100.avif",
									price: 549,
								}, {
									id: 11,
									name: "Бефстроганов",
									imageUrl: "https://media.dodostatic.net/image/r:233x233/11EEF9E43DC39C94AA5765DBF1C97100.avif",
									price: 549,
								}, {
									id: 12,
									name: "Бефстроганов",
									imageUrl: "https://media.dodostatic.net/image/r:233x233/11EEF9E43DC39C94AA5765DBF1C97100.avif",
									price: 549,
								}
							]}
							categoryId={1}
						/>
						<ProductsGroupList
							title="Комбо"
							items={[
								{
									id: 1,
									name: "Додстер",
									imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7970259D888E98B6407EE6B994D9.avif",
									price: 217,
								}, {
									id: 2,
									name: "Додстер",
									imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7970259D888E98B6407EE6B994D9.avif",
									price: 217,
								}, {
									id: 3,
									name: "Додстер",
									imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7970259D888E98B6407EE6B994D9.avif",
									price: 217,
								}, {
									id: 4,
									name: "Додстер",
									imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7970259D888E98B6407EE6B994D9.avif",
									price: 217,
								}, {
									id: 5,
									name: "Додстер",
									imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7970259D888E98B6407EE6B994D9.avif",
									price: 217,
								},
							]}
							categoryId={2}
						/>
						{/* <ProductsGroupList title="Комбо" items={[ 1, 2, 3, 4, 5 ]} /> */}
					</div>
				</div>

			</div>
		</Container>
	</>;
}
